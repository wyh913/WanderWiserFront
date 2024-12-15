
  ;(function(){
  let u=void 0,isReady=false,onReadyCallbacks=[],isServiceReady=false,onServiceReadyCallbacks=[];
  const __uniConfig = {"pages":[],"globalStyle":{"backgroundColor":"#F8F8F8","navigationBar":{"backgroundColor":"#F8F8F8","titleText":"uni-app","type":"default","titleColor":"#000000"},"isNVue":false},"nvue":{"compiler":"uni-app","styleCompiler":"uni-app","flex-direction":"column"},"renderer":"auto","appname":"WanderWiser","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":true},"compilerVersion":"4.24","entryPagePath":"pages/login","entryPageQuery":"","realEntryPagePath":"","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000},"locales":{},"darkmode":false,"themeConfig":{}};
  const __uniRoutes = [{"path":"pages/login","meta":{"isQuit":true,"isEntry":true,"enablePullDownRefresh":false,"navigationBar":{"titleText":"登录","style":"custom","type":"default"},"isNVue":false}},{"path":"pages/home","meta":{"navigationBar":{"titleText":"首页","type":"default"},"isNVue":false}},{"path":"pages/person/index","meta":{"navigationBar":{"titleText":"个人主页","type":"default"},"isNVue":false}},{"path":"pages/person/persondata","meta":{"navigationBar":{"titleText":"个人资料","type":"default"},"isNVue":false}},{"path":"pages/person/prefer","meta":{"navigationBar":{"titleText":"个人中心","type":"default"},"isNVue":false}},{"path":"pages/trip/gettrip","meta":{"navigationBar":{"titleText":"获取行程界面","type":"default"},"isNVue":false}},{"path":"pages/trip/daily","meta":{"navigationBar":{"titleText":"行程总览","type":"default"},"isNVue":false}},{"path":"pages/trip/dailyactivity","meta":{"navigationBar":{"titleText":"单日行程","type":"default"},"isNVue":false}},{"path":"pages/trip/map","meta":{"navigationBar":{"titleText":"获取地点","type":"default"},"isNVue":false}},{"path":"pages/trip/trip","meta":{"navigationBar":{"titleText":"获取路径","type":"default"},"isNVue":false}},{"path":"pages/userdata/history","meta":{"navigationBar":{"titleText":"历史行程","type":"default"},"isNVue":false}}].map(uniRoute=>(uniRoute.meta.route=uniRoute.path,__uniConfig.pages.push(uniRoute.path),uniRoute.path='/'+uniRoute.path,uniRoute));
  __uniConfig.styles=[];//styles
  __uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
  __uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
  service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:16})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:u,window:u,document:u,frames:u,self:u,location:u,navigator:u,localStorage:u,history:u,Caches:u,screen:u,alert:u,confirm:u,prompt:u,fetch:u,XMLHttpRequest:u,WebSocket:u,webkit:u,print:u}}}}); 
  })();
  