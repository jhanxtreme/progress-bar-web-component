;(function(document){

    function ProgressBarComponent(){
        var Element = Object.create(HTMLElement.prototype);
        var shadowRoot;

        Element.createdCallback = function(){
            shadowRoot = this.createShadowRoot({ mode: 'open'});
            var bgColor = this.getAttributeValue(this.attributes['bgColor'], { default: '#f44336' });
            var template = `
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
                    background-color: {{bgcolor}};
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

            template = template.replace('{{bgcolor}}', bgColor);

            shadowRoot.innerHTML = template;
        };

        Element.attributeChangedCallback = function(name, oldVal, newVal){
            if(!shadowRoot) return;

            if(name == 'complete'){
                var completeElement = shadowRoot.querySelector('.complete');
                var innerElement = shadowRoot.querySelector('.inner'); 

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
        };

        Element.getAttributeValue = function(attr, params){
            return (attr && attr.value) ? attr.value : params.default;
        }

        document.registerElement('progress-bar2', { prototype: Element });
    }
    new ProgressBarComponent(); 

})(document)
