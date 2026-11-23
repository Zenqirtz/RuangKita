export default function ApplicationLogo({ className = 'h-9 w-auto', variant = 'blue', ...props }) {
    const src = variant === 'white' ? '/images/logo-white.svg' : '/images/logo.svg';
    return (
        <img
            src={src}
            alt="RuangKita"
            className={className}
            {...props}
        />
    );
}
