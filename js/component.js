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
            <h1>仪表台</h1>
            <p>这是一个由神奇のDzoer创建的页面，目前什么都没有...</p>
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