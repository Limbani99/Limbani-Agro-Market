import React from 'react';
import { Link } from 'react-router-dom';

const HomeCategories = () => {
    const categories = [
        { name: "Tractors", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAkCU4wzOwIgJGePnIVCE7oS1JVLfqBQZelpjmcr_qoWw2X9w9szKQIuekUTRm0mNAXMIyAEdCyaCRC7_4PVgdPkoKjsHI3ar9IfGmocaOKMPQq1PcbeeCm3KvMRyEBSeHqFXeiBJjGCGnq1gYzfk7CE33HBQz-m0nHCwObeXtIfcR7voCi0EVlqNqtyHE1Z-QuCea61TeqT5ZP-RV3cQazkR3Zzv5ZtB35EM6MbzF7CBye0RNA4jgbtQ", count: "1,200+" },
        { name: "Rotavator", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCv_w5beeF2WOzJBihQxE-XhWpFNkshBRmg9StWWc0toa7upE0pF0tygEG7yFeIRPS0YJfxWWX9cz2j9w2SNANE0vb1bl3zt_IiYEu2vulYwC5M3zeXSTMg-FKGbuz3edXvvF1dY89ZrjImIZbw9J7Kn2UPqHqZwAz4j67ipMdry_aRysYf4jXREgxLTAZwBjTA2Pc1JwiENkMa1tO0f-PWHMuroUDhhSGH1PyaYQbX8gm5-1zvi5i6cg", count: "850+" },
        { name: "Cultivator", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAG-x2Iva2_JROLsbQD1Adn0uuEDLpnJzlBu_mPYwiN0pP56VYLK3K5vrDmDhEJt9nghJue-0XQvDpyUqRVyUifO7YHJAYPji3aEDUT1NJDGk0pusCHc3KOYJ9z55YJ_tIFIo-02t2k2InxxpINiKaGNK5vATMnNn6E6zRgHBX-x0jHEnzwR_gWsURRLUomOK8lbWh0FnstFpH61yZXWEy_rSCvDtmf0mS110i0yMS_mf6nbgA_HoS7Ug", count: "640+" },
        { name: "Plough", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzhvZGLIn5hxPR0Civ_P894fw6UURj5JiVnxkxWsx55EEvi1m-4DzDtUxWS67cW7cFw4Pr2nqa3gCu9yrmQGPOyZpCrO9e44qqV7iaoWa5oWptlADJNKuCzi6z6Qv8DydDiVFhCU74mY-9jGYo4O-NXgV0oW6f_m3_-ULnJNdPDSCvuasbbjpHjBkmCVBne-CgHwt52Yr_Cd07teNfFuIlvCRLYk_6Asyd45cT424HDTIz4r5P-6GyYQ", count: "420+" },
        { name: "Harvester", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBA93teIHrSA3iIqq77X2nHOFQF8bDxQwD2y904cQZDwuEHCkGib-mI6T-tEAbh8151SyTXkGOFQUBGmyQKMfauUEET1np2kKgNX-nE_avYQSWO-QbbJCLU14B1PtyDDcWOyt0eNQ2DqkDDZoVSsG6bdN-mGOpkzbm94cbqZmY7YCH94Uope-T-t9VW9Dlii0sBxgvtjQsCpEvb_ma-kezYTeVZpW586nj7pGphZYujoyti5fhJ6obiAw", count: "150+" },
        { name: "Trailer", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8WhAcBIS71SV4hKXoeBwqJNB5DqqTvnZCW-GBbs8vmRHROFCuwEGNa8IzutyDDEVGRD6SZ5u1ebM3qtSgIjlNu4Ig4ew_INxCC4I39WFanzjF_ekrjS-58AG9iAJv1QEzV7fVTzRGyE-OGI4t4EGFKuZcY0L0J0RU51V4V6JReZLb5bek7x5XS6FydFGiIo9PMDPcdUxpgh0UNBsdCtv1Y9ckB5nhcRrC2nkdvrtcJQy2D9szBy2X3A", count: "380+" }
    ];

    return (
        <section className="py-24 bg-surface-container-lowest">
            <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary font-label-sm mb-4 border border-secondary/20 font-bold">
                            <span className="material-symbols-outlined text-[16px]">category</span>
                            Categories
                        </div>
                        <h2 className="font-display-md text-3xl md:text-4xl font-bold text-on-surface mb-4">Browse by Equipment Type</h2>
                        <p className="font-body-lg text-on-surface-variant">Find the exact machinery you need for your farm quickly and easily. Browse thousands of verified listings.</p>
                    </div>
                    <Link to="/categories" className="font-label-md text-label-md text-primary font-bold hover:bg-primary/10 px-6 py-3 rounded-full transition-colors flex items-center gap-2 whitespace-nowrap">
                        Explore All Categories <span className="material-symbols-outlined">arrow_forward</span>
                    </Link>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {categories.map((cat, idx) => (
                        <Link to="/equipments" key={idx} className="bg-surface rounded-3xl card-shadow overflow-hidden group border border-outline-variant/30 hover:border-primary/50 transition-all hover:-translate-y-2 hover:shadow-xl flex flex-col">
                            <div className="h-40 bg-gradient-to-br from-surface-container-low to-surface-container flex items-center justify-center p-4 relative overflow-hidden">
                                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <img className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500 drop-shadow-md" src={cat.img} alt={cat.name} />
                            </div>
                            <div className="p-5 text-center bg-surface flex-1 flex flex-col justify-center">
                                <h3 className="font-title-md font-bold text-on-surface group-hover:text-primary transition-colors">{cat.name}</h3>
                                <p className="text-sm text-on-surface-variant font-medium mt-1">{cat.count} listings</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HomeCategories;
