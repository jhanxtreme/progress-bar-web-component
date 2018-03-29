;(function(document){
    
    customElements.define('progress-bar', class extends HTMLElement{
        constructor(){
            super();
            this._shadowRoot = this.createShadowRoot();
        }

        static get observedAttributes() {
            return ['complete', 'bgColor'];
        }

        connectedCallback() {
            let bgColor = this.attributes['bgColor'] ? this.attributes['bgColor'].value : '#4caf50';
            let template = `
                <style>
                    :host{
                        display:block;
                    }
                    *, *::after, *::before{
                        box-sizing: border-box;
                    }
                    .progress-bar{
                        background-color: #ddd;
                        height: 1.8em;
                        width: 100%;
                        border-radius: 3px;
                        position: relative;
                        font-family: arial;
                        margin-bottom: .5em;
                    }
                    .inner{
                        position:inherit;
                        width: 0%;
                        height: inherit;
                        background-color: ${bgColor};
                        border-radius: 3px;
                        transition: width .1s;
                    }
                    .complete{
                        position: absolute;
                        width: 100%;
                        text-align:center;
                        top: 50%;
                        transform: translateY(-50%);
                        z-index: 1;
                        color:#555;
                    }
                </style>
                <div class="progress-bar">
                    <div class="complete">0%</div>
                    <div class="inner"></div>
                </div>
            `;
            this._shadowRoot.innerHTML = template;
        }

        attributeChangedCallback(attrName, oldVal, newVal){
            if(!this._shadowRoot) return;

            if(attrName == 'complete'){
                
                let completeElement = this._shadowRoot.querySelector('.complete');
                let innerElement = this._shadowRoot.querySelector('.inner'); 

                if(completeElement){
                    completeElement.innerHTML = newVal + '%';
                    if(newVal >= 50){
                        completeElement.setAttribute('style', 'color: #fff');
                    }
                }
                if(innerElement){
                    innerElement.setAttribute('style', 'width: ' + newVal + '%');
                }
            }
        }

    });

})(document);