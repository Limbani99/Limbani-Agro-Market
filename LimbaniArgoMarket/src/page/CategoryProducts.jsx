import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import EquipmentCard from '../components/EquipmentCard';
import { useData } from '../context/DataProvider';

const CategoryProducts = () => {
    const { categoryName } = useParams();
    const navigate = useNavigate();
    const { getAllProduct } = useData();
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    const decodedCategory = decodeURIComponent(categoryName || '');

    useEffect(() => {
        const fetchCategoryProducts = async () => {
            try {
                if (getAllProduct) {
                    const data = await getAllProduct();
                    if (data && Array.isArray(data) && data.length > 0) {
                        const normalized = data.map((item, index) => ({
                            ...item,
                            id: item._id || item.id || index + 1,
                            name: item.title || item.productName || item.name || "Agricultural Machinery",
                            price: typeof item.price === 'number' ? `₹${item.price.toLocaleString('en-IN')}` : (item.price || 'Contact for Price'),
                            location: [item.district, item.state].filter(Boolean).join(', ') || item.address || item.location || "Gujarat, India",
                            year: item.manufactureYear || item.year || 2022,
                            hours: item.horsePower ? `${item.horsePower} HP` : (item.hours || item.width || 'Standard'),
                            condition: item.condition || "Used",
                            category: item.category || item.vehicleType || "Machinery",
                            vehicleType: item.vehicleType || (['Rotavator', 'Cultivator', 'Plow', 'Plough', 'Trolley', 'Thresher', 'Seed Drill', 'Sprayer', 'Baler', 'Reaper', 'Implement', 'Attachment'].includes(item.category) ? 'Non-Drivable' : 'Drivable'),
                            isVerified: true,
                            isFeatured: true,
                            image: (item.images && item.images.length > 0) ? item.images[0] : (item.image || "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=600&q=80"),
                            seller: {
                                phone: item.phone || item.sellerPhone || '+919023341592',
                                whatsapp: item.whatsapp || item.phone || '919023341592'
                            }
                        }));

                        // Filter by category name matching
                        const targetKey = decodedCategory.toLowerCase().trim();
                        const matching = normalized.filter(item => {
                            const cat = (item.category || item.vehicleType || item.title || item.productName || item.name || '').toLowerCase();
                            return cat.includes(targetKey) || targetKey.includes(cat);
                        });

                        setProducts(matching.length > 0 ? matching : normalized.filter(item => {
                            const firstWord = targetKey.split(' ')[0];
                            const cat = (item.category || item.vehicleType || item.title || item.productName || item.name || '').toLowerCase();
                            return cat.includes(firstWord);
                        }));
                    } else {
                        setProducts([]);
                    }
                } else {
                    setProducts([]);
                }
            } catch (err) {
                console.error("Error fetching category products:", err);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCategoryProducts();
    }, [decodedCategory, getAllProduct]);

    return (
        <main className="w-full pt-[72px] pb-20 min-h-screen bg-background">
            {/* Header / Breadcrumb Section */}
            <div className="bg-surface border-b border-outline-variant/30 py-6 sm:py-8 mb-8 sm:mb-12">
                <div className="max-w-container-max mx-auto px-4 sm:px-margin-mobile md:px-margin-desktop">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <nav className="flex items-center gap-2 text-xs sm:text-sm text-on-surface-variant font-medium mb-3">
                                <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                                <Link to="/categories" className="hover:text-primary transition-colors">Categories</Link>
                                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                                <span className="text-primary font-bold">{decodedCategory}</span>
                            </nav>
                            <h1 className="font-display-lg text-2xl sm:text-3xl md:text-4xl font-extrabold text-on-surface flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary text-3xl sm:text-4xl">category</span>
                                <span>{decodedCategory}</span>
                            </h1>
                            <p className="font-body-md text-xs sm:text-sm text-on-surface-variant mt-1 font-medium">
                                Showing all available equipment and machinery listed under <span className="text-primary font-bold">{decodedCategory}</span>.
                            </p>
                        </div>

                        <button
                            onClick={() => navigate('/categories')}
                            className="px-4 py-2.5 bg-surface-container hover:bg-surface-container-high text-on-surface border border-outline-variant/30 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 self-start sm:self-center shadow-sm cursor-pointer active:scale-95 shrink-0"
                        >
                            <span className="material-symbols-outlined text-base">arrow_back</span>
                            <span>Back to Categories</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Product List Content */}
            <div className="max-w-container-max mx-auto px-4 sm:px-margin-mobile md:px-margin-desktop">
                {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent"></div>
                        <p className="mt-4 text-on-surface-variant font-medium">Loading {decodedCategory} products...</p>
                    </div>
                ) : products.length > 0 ? (
                    <div>
                        <div className="flex items-center justify-between gap-3 mb-6">
                            <span className="text-xs sm:text-sm font-bold text-on-surface-variant bg-surface-container px-3.5 py-1.5 rounded-full border border-outline-variant/30">
                                Total {products.length} Products Found
                            </span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6">
                            {products.map((eq) => (
                                <EquipmentCard key={eq.id} equipment={eq} />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-16 bg-surface-container-lowest rounded-3xl border border-outline-variant/30 card-shadow max-w-2xl mx-auto">
                        <span className="material-symbols-outlined text-6xl text-outline mb-3">agriculture</span>
                        <h3 className="font-headline-lg text-xl font-bold text-on-surface mb-1">
                            No products currently listed for "{decodedCategory}"
                        </h3>
                        <p className="text-sm text-on-surface-variant mb-6 font-medium">
                            Be the first seller to list a {decodedCategory} on Limbani Agro Market!
                        </p>
                        <div className="flex flex-wrap justify-center items-center gap-3">
                            <Link
                                to="/add-product"
                                className="px-5 py-2.5 bg-primary text-on-primary font-bold text-xs sm:text-sm rounded-xl hover:bg-primary/90 transition-all shadow-md flex items-center gap-2"
                            >
                                <span className="material-symbols-outlined text-base">add_circle</span>
                                List {decodedCategory}
                            </Link>
                            <Link
                                to="/equipments"
                                className="px-5 py-2.5 bg-surface-container hover:bg-surface-container-high text-on-surface font-bold text-xs sm:text-sm rounded-xl border border-outline-variant/30 transition-all"
                            >
                                View All Machinery
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
};

export default CategoryProducts;
