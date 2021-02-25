var loadbar = new Vue({
    el: "#loadbar",
    data: {
        display: 'display: none'
    }
})

var mainAreaName = "index";
Vue.component('index', {
    template: `
    <div class="mdui-container-fluid" style="margin:30px 20px">
            <h1>无法访问</h1>
            <p>资金原因，暂时关闭网站 *.ecy.pink</p>
            <p>联系QQ：2475539124</p>
    </div>
    `,
})

function reloadMainArea() {
    new Vue({
        el: '#mainArea',
        beforeCreate: function() {
            loadbar.display = 'display: block';
        },
        created: function() {
            loadbar.display = 'display: none';
        },
        beforeUpdate: function() {
            loadbar.display = 'display: block';
        },
        updated: function() {
            loadbar.display = 'display: none';
        },
    });
}

reloadMainArea()
