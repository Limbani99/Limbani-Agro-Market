import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-surface-container-highest dark:bg-surface-dim w-full py-stack-lg border-t border-outline-variant dark:border-outline flat no shadows">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-gutter px-margin-desktop max-w-container-max mx-auto">
                <div className="col-span-2 md:col-span-4 lg:col-span-2 mb-8 lg:mb-0">
                    <div className="font-display-lg text-headline-lg text-primary dark:text-primary-fixed-dim mb-4">
                        Limbani Agro Market
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant dark:text-on-tertiary-fixed-variant mb-4 max-w-xs">
                        Connecting farmers and dealers across India to buy and sell quality used agricultural equipment securely and efficiently.
                    </p>
                    <div className="font-body-md text-body-md text-on-surface-variant dark:text-on-tertiary-fixed-variant">
                        © 2024 Limbani Agro Market. All rights reserved.
                    </div>
                </div>
                <div>
                    <h4 className="font-title-md text-title-md text-on-surface mb-4">Quick Links</h4>
                    <ul className="space-y-2 flex flex-col">
                        <a className="font-body-md text-body-md text-on-surface-variant dark:text-on-tertiary-fixed-variant hover:underline hover:text-primary transition-all cursor-pointer w-fit" href="#">Company</a>
                        <a className="font-body-md text-body-md text-on-surface-variant dark:text-on-tertiary-fixed-variant hover:underline hover:text-primary transition-all cursor-pointer w-fit" href="#">Categories</a>
                        <a className="font-body-md text-body-md text-on-surface-variant dark:text-on-tertiary-fixed-variant hover:underline hover:text-primary transition-all cursor-pointer w-fit" href="#">Dealers</a>
                    </ul>
                </div>
                <div>
                    <h4 className="font-title-md text-title-md text-on-surface mb-4">Services</h4>
                    <ul className="space-y-2 flex flex-col">
                        <a className="font-body-md text-body-md text-on-surface-variant dark:text-on-tertiary-fixed-variant hover:underline hover:text-primary transition-all cursor-pointer w-fit" href="#">Custom Work</a>
                        <a className="font-body-md text-body-md text-on-surface-variant dark:text-on-tertiary-fixed-variant hover:underline hover:text-primary transition-all cursor-pointer w-fit" href="#">Resources</a>
                        <a className="font-body-md text-body-md text-on-surface-variant dark:text-on-tertiary-fixed-variant hover:underline hover:text-primary transition-all cursor-pointer w-fit" href="#">Contact</a>
                    </ul>
                </div>
                <div className="col-span-2 md:col-span-2">
                    <h4 className="font-title-md text-title-md text-on-surface mb-4">Newsletter</h4>
                    <p className="font-body-md text-body-md text-on-surface-variant mb-4">Subscribe for the latest equipment deals and farming tips.</p>
                    <div className="flex gap-2">
                        <input className="w-full bg-surface border border-outline-variant rounded-lg px-3 py-2 font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="Your email" type="email" />
                        <button className="bg-primary-container text-on-primary font-label-md px-4 py-2 rounded-lg hover:opacity-90">Subscribe</button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
