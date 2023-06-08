import { Injectable } from '@angular/core';

const myScripts = [
    { name: 'jqueryJS', src: 'assets/js/templateScripts/jquery-min.js' },
    { name: 'popperJS', src: 'assets/js/templateScripts/popper.min.js' },
    { name: 'bootstrapJS', src: 'assets/js/templateScripts/bootstrap.min.js' },
    { name: 'jquerymixitup', src: 'assets/js/templateScripts/jquery.mixitup.js' },
    { name: 'nivolightbox', src: 'assets/js/templateScripts/nivo-lightbox.js' },
    { name: 'owlcarouselJS', src: 'assets/js/templateScripts/owl.carousel.js' },
    { name: 'jquerystellarJS', src: 'assets/js/templateScripts/jquery.stellar.min.js' },
    { name: 'jquerynavJS', src: 'assets/js/templateScripts/jquery.nav.js' },
    { name: 'scrollingnavJS', src: 'assets/js/templateScripts/scrolling-nav.js' },
    { name: 'jqueryeasingJS', src: 'assets/js/templateScripts/jquery.easing.min.js' },
    { name: 'smoothscrollJS', src: 'assets/js/templateScripts/smoothscroll.js' },
    { name: 'jqueryslicknavJS', src: 'assets/js/templateScripts/jquery.slicknav.js' },
    { name: 'wowJS', src: 'assets/js/templateScripts/wow.js' },
    { name: 'jqueryvideJS', src: 'assets/js/templateScripts/jquery.vide.js' },
    { name: 'jquerycounterupJS', src: 'assets/js/templateScripts/jquery.counterup.min.js' },
    { name: 'jquerymagnificpopupJS', src: 'assets/js/templateScripts/jquery.magnific-popup.min.js' },
    { name: 'waypointsJS', src: 'assets/js/templateScripts/waypoints.min.js' },
    { name: 'formvalidatorJS', src: 'assets/js/templateScripts/form-validator.min.js' },
    { name: 'contactformJS', src: 'assets/js/templateScripts/contact-form-script.js' },
    { name: 'mainJS', src: 'assets/js/templateScripts/main.js' }
];

@Injectable()
export class ScriptService {

    private scripts: any = {};
    constructor() {
        myScripts.forEach((script: any) => {
            this.scripts[script.name] = {
                loaded: false,
                src: script.src
            };
        });
    }

    // load a single or multiple scripts
    load(scripts: string[]) {
        const promises: any[] = [];
        // push the returned promise of each loadScript call 
        scripts.forEach((script) => promises.push(this.loadScript(script)));
        // return promise.all that resolves when all promises are resolved
        return Promise.all(promises);
    }

    // load the script
    loadScript(name: string) {
        return new Promise((resolve, reject) => {
            // resolve if already loaded
            if (this.scripts[name].loaded) {
                resolve({ script: name, loaded: true, status: 'Already Loaded' });
            } else {
                // load script
                let script = document.createElement('script') as any;
                script.type = 'text/javascript';
                script.src = this.scripts[name].src;
                // cross browser handling of onLoaded event
                if (script.readyState) {  // IE
                    script.onreadystatechange = () => {
                        if (script.readyState === 'loaded' || script.readyState === 'complete') {
                            script.onreadystatechange = null;
                            this.scripts[name].loaded = true;
                            resolve({ script: name, loaded: true, status: 'Loaded' });
                        }
                    };
                } else {  // Others
                    script.onload = () => {
                        this.scripts[name].loaded = true;
                        resolve({ script: name, loaded: true, status: 'Loaded' });
                    };
                }
                script.onerror = (error: any) => resolve({ script: name, loaded: false, status: 'Loaded' });
                // finally append the script tag in the DOM
                document.getElementsByTagName('body')[0].appendChild(script);
            }
        });
    }

}