const routes = {
    '/login': { templateId: 'login' },
    '/dashboard': { templateId: 'dashboard' },
};



function updateRoute() {
    const path = window.location.pathname;
    const route = routes[path];


    if (!route) {
        return navigate('/login');
    }
    const template = document.getElementById(route.templateId);
    const view = template.content.cloneNode(true);
    const app = document.getElementById('app');
    app.innerHTML = '';
    app.appendChild(view);
    changeTitle();
}

updateRoute(login);

function navigate(path) {
    const location = path.startsWith('/') ? window.location.origin + path : path;
    window.history.pushState({}, path, location);
    updateRoute();
}

function onLinkClick(event) {
    event.preventDefault();
    navigate(event.target.href);
}

function changeTitle(){
    let title = document.getElementById('page-title');
    let path = window.location.pathname.split('/');

    if (path[1].includes('dashboard')){
        title.innerHTML = "Dashboard - Branquinho's Bank";
        console.log('Dashboard is shown')
    } else {
        title.innerHTML = `${path[1].charAt(0).toUpperCase() + path[1].slice(1)} - Branquinho's Bank`
    }
}

window.onpopstate = () => updateRoute();
updateRoute();