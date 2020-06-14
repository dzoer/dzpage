/*
 *   Created By Dzoer
 *   2020/6/13 21:01 Vscode
 */


// Sider Bar

siderbar = { //基础数据初始化
    body: new mdui.Drawer('#siderbar'), //创建MDUI侧栏
    btn: document.querySelector("#siderbarBtn"), //选中激活按钮
    status: 1 //PC端默认是否打开【0 or 1】
}

function doSidebar() { //侧栏方法
    if (document.body.clientWidth >= 1024) {
        siderbar.btn.addEventListener('click', function() {
            if (siderbar.status == 0) {
                siderbar.body.open();
                siderbar.status = 1
            } else {
                siderbar.body.close();
                siderbar.status = 0
            }
        }, true);
    } else {
        siderbar.btn.addEventListener('click', function() {
            siderbar.body.open();
            console.log(siderbar)
        }, true);
    }
}
doSidebar() //初始化
window.onresize = doSidebar; //更新方法

//Sidebar List
axios.get('./data/sidebar.json')
    .then(function(result) {
        var siderbarList = new Vue({
            el: "#siderbarList",
            data: {
                list: result.data
            },
            methods: {
                goto: function(url) {
                    goto(url);
                }
            }
        });
    })
    .catch(function() {
        tip("侧栏列表载入失败", "error")
    })

//Tip

function tip(text, func, where = 'bottom', time = 2000) {
    switch (func) {
        case "unBuild":
            var unBuildTip = '未构造';
            mdui.snackbar({
                message: text + unBuildTip,
                position: where,
                timeout: time
            });
            break;
        case "error":
            var error = '错误：';
            mdui.snackbar({
                message: error + text,
                position: where,
                timeout: time
            });
            break;
        case "goto":
            mdui.snackbar({
                message: text,
                position: where,
                timeout: time,
                buttonText: '取消',
                onButtonClick: function() {
                    clearTimeout(gotoTimer);
                    tip('已取消', '', 'bottom', 1000)
                },
            });
            break;
        default:
            mdui.snackbar({
                message: text,
                position: where,
                timeout: time
            });
    }
}

//页面跳转

function goto(url, time = 3000, isTip = false) {
    if (isTip) {
        var gototip = document.createElement("gototip");
        document.getElementById('freeArea').appendChild(gototip);
        Vue.component(
            'gototip', {
                template: `
                    <div id="gototipComponent">
                    <div class="mdui-dialog" id="gototip">
                    <div class="mdui-dialog-title">操作确认</div>
                    <div class="mdui-dialog-content">即将前往 {{url}}</div>
                    <div class="mdui-dialog-actions">
                      <button class="mdui-btn mdui-ripple" mdui-dialog-close @click="remove">取消</button>
                      <button class="mdui-btn mdui-ripple" mdui-dialog-close @click='goto'>确认</button>
                    </div>
                    </div>
                    </div>
                `,
                methods: {
                    goto: function() {
                        goto(url, time, 0)
                    },
                    remove: function() {
                        document.getElementById('gototipComponent').remove()
                    }
                },
                data() {
                    return {
                        url: url,
                        time: time,
                    }
                }
            }
        )
        var freeArea = new Vue({
            el: "#freeArea",
            data: {}
        });
        var gototip = new mdui.Dialog('#gototip');
        gototip.open();
        // tip(time / 1000 + 's后跳转至' + url, '', 'bottom', time);
        // setTimeout(function() {
        //     window.location = url;
        // }, time + 200)
    } else {
        tip(time / 1000 + 's后跳转至' + url, 'goto', 'bottom', time);
        gotoTimer = setTimeout(function() {
            window.location = url;
        }, time + 200)
    }
}

//刷新页面

var refreshBtn = document.getElementsByClassName('refresh');
[].forEach.call(refreshBtn, function(item, index) {
    item.addEventListener('click', function() {
        // tip('页面刷新', 'unBuild');
        loadbar.display = 'display: block';
        document.getElementById('mainArea').innerHTML = "";
        var page = document.createElement(mainAreaName);
        document.getElementById('mainArea').appendChild(page);
        setTimeout(reloadMainArea, 500)
    }, true)
});