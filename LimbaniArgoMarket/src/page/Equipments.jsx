import React, { useState, useEffect } from 'react';
import EquipmentCard from '../components/EquipmentCard';
import { useData } from '../context/DataProvider';

const Equipments = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { getAllProduct } = useData();
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                if (getAllProduct) {
                    const data = await getAllProduct();
                    if (data && Array.isArray(data)) {
                        const normalized = data.map((item, index) => ({
                            id: item._id || item.id || index + 1,
                            name: item.title || item.productName || item.name || "Agricultural Machinery",
                            price: typeof item.price === 'number' ? `₹${item.price.toLocaleString('en-IN')}` : (item.price || 'Contact for Price'),
                            location: [item.district, item.state].filter(Boolean).join(', ') || item.address || item.location || "Gujarat, India",
                            year: item.manufactureYear || item.year || 2022,
                            hours: item.horsePower ? `${item.horsePower} HP` : (item.hours || item.width || 'Standard'),
                            condition: item.condition || "Used",
                            isVerified: true,
                            isFeatured: true,
                            image: (item.images && item.images.length > 0) ? item.images[0] : (item.image || "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=600&q=80"),
                            seller: {
                                phone: item.phone || item.sellerPhone || '+919023341592',
                                whatsapp: item.whatsapp || item.phone || '919023341592'
                            }
                        }));
                        setProducts(normalized);
                    }
                }
            } catch (err) {
                console.error("Error fetching products:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, []);

    const filteredEquipments = products.filter(equipment =>
        (equipment.name || equipment.title || equipment.productName || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <main className="w-full pt-[72px] pb-20 min-h-screen bg-background">
            <div className="bg-surface border-b border-outline-variant/30 py-10 mb-10">
                <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
                    <h1 className="font-display-lg text-4xl md:text-5xl font-bold text-on-surface mb-4">All Equipment</h1>
                    <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto mb-8">
                        Browse our complete inventory of tractors, harvesters, and implements from verified sellers across India.
                    </p>

                    <div className="max-w-3xl mx-auto flex gap-4">
                        <div className="flex-1 bg-surface-container rounded-lg flex items-center px-4 border border-outline-variant focus-within:border-primary transition-colors">
                            <span className="material-symbols-outlined text-outline">search</span>
                            <input
                                className="w-full bg-transparent border-none focus:ring-0 font-body-md text-on-surface ml-2 py-3 outline-none"
                                placeholder="Search by name, brand or model..."
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="font-title-md text-xl font-bold text-on-surface">
                        {filteredEquipments.length} {filteredEquipments.length === 1 ? 'Result' : 'Results'} Found
                    </h2>
                    <div className="flex items-center gap-2">
                        <span className="font-body-sm text-on-surface-variant">Sort by:</span>
                        <select className="bg-surface border border-outline-variant rounded-md px-3 py-1.5 font-body-sm text-on-surface outline-none focus:border-primary">
                            <option>Newest First</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent"></div>
                        <p className="mt-4 text-on-surface-variant font-medium">Loading products...</p>
                    </div>
                ) : filteredEquipments.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
                        {filteredEquipments.map(eq => (
                            <EquipmentCard key={eq.id} equipment={eq} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-surface-container-lowest rounded-xl border border-outline-variant/30">
                        <span className="material-symbols-outlined text-6xl text-outline mb-4">search_off</span>
                        <h3 className="font-title-md text-2xl text-on-surface font-bold mb-2">No equipment found</h3>
                        <p className="text-on-surface-variant">No products uploaded yet or match your search criteria.</p>
                    </div>
                )}
            </div>
        </main>
    );
};

export default Equipments;
