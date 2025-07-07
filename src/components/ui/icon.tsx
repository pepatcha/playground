interface IconProps {
    icon: string;
    style?: object;
    className?: string;
}

const Icon = ({ icon, className, style = {} }: IconProps) => {
    return (
        <span
            style={{
                color: "var(--text)",
                ...style,
            }}
            className={`material-symbols-rounded ${className}`}
        >
            {icon}
        </span>
    );
}

export default Icon;
