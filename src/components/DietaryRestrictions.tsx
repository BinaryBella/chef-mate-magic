interface DietaryRestrictionsProps {
  value: string;
  onChange: (value: string) => void;
}

const DietaryRestrictions = ({ value, onChange }: DietaryRestrictionsProps) => {
  return (
    <div className="mb-6">
      <label className="block text-brand-text font-medium mb-2">
        Any dietary restrictions? (e.g., vegan, gluten-free, nut-free)
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter any dietary restrictions or preferences..."
        className="w-full px-4 py-3 border border-light-gray rounded-lg focus:outline-none focus:border-brand-primary bg-white text-brand-text resize-none"
        rows={3}
      />
    </div>
  );
};

export default DietaryRestrictions;