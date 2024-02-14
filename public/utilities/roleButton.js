// https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role
// Needs support for toggle of aria


// All this could be for naught (although some clever ideas). Test if styling adjustments work: 
// https://stackoverflow.com/questions/2460100/remove-the-complete-styling-of-an-html-button-submit

(function (window) {
    'use strict';

    class RoleButtonManager {
        name = "Role Button Manager";
        buttons = [];
        failedButtons = [];
        
        constructor() {
            if(!RoleButtonManager.instance) {
                this.refreshButtons();
                
                RoleButtonManager.instance = this
            }
            return RoleButtonManager.instance
        }
        
        addClickListener(el, handler) {
            function handleClick(e) {
                e.preventDefault();
                handler(e);
            }
            el.addEventListener('click', handleClick);

            return () => el.removeEventListener('click', handleClick);
        }

        refreshButtons() {
            window.console.log("Looking for Role Based Buttons...");
            this.buttons = window.document.querySelector("[role=button]"); 
        }

        addKeyDownListener(el, handler) {
            function handleKeyDown(e) {
                if (e.which === 32 || e.which === 13) {
                    e.preventDefault();
                    handler(e);
                }
            }
            el.addEventListener('keyDown', handleKeyDown);

            return () => el.removeEventListener('keyDown', handleKeyDown);
        }

        checkRoleButtons() {
            const failedButtons = this.buttons.values().reduce((failed, el) => {
                const validationRes = this.validateRoleButton(el);
                
                if (!validationRes.valid) {
                    failed.push(validationRes);
                }

                return failed;
            }, []);

            return {
                allValid: failedButtons.length === 0,
                errors: failedButtons,
            };
        }

        validateRoleButton(el) {
            let valid = true;
            const errors = [];

            // Check for patterns for common uses (expands element, opens pop-up, on/off);

            return {
                valid,
                el,
                errors,
            }
        }
    
    }

    if(window.roleButtonManager) {
        throw new Error('window.roleButtonManager is already defined');
    }

    window.roleButtonManager = new RoleButtonManager();
    
})(window);