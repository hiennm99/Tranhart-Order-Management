export const PlaceholderView = ({ title, icon: Icon, description }) => (
    <div className="flex items-center justify-center h-64">
        <div className="text-center">
            <Icon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-500">{description}</p>
        </div>
    </div>
);