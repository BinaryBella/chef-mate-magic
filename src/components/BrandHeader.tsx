const BrandHeader = () => {
  return (
    <div className="mb-8 flex items-center gap-3">
      {/* Logo */}
      <div className="w-10 h-10 rounded-full flex items-center justify-center">
        <img src="/lovable-uploads/food_icon.png" alt="ChefMate Logo" className="w-7 h-7" />
      </div>
      
      {/* Brand Text */}
      <h1 className="text-2xl font-bold">
        <span className="text-brand-text">Chef</span>
        <span className="text-brand-primary">Mate</span>
      </h1>
    </div>
  );
};

export default BrandHeader;