import {getContactInfo} from '@/app/lib/resume/resume.utils';

type ContactInfo = ReturnType<typeof getContactInfo>;

function ContactLink({
    href,
    children,
}: {
    href: string;
    children: React.ReactNode;
}) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 transition-colors underline underline-offset-2 decoration-gray-300 print:no-underline"
        >
            {children}
        </a>
    );
}

export function ContactHeader({contact}: {contact: ContactInfo}) {
    if (!contact.fullName) return null;

    const isUrl = (val: string) =>
        val.startsWith('http') ||
        (val.includes('.') &&
            !val.includes('@') &&
            !val.match(/^\+?[\d\s\-()]+$/));

    const items: {label: string; href?: string}[] = [
        contact.email
            ? {label: contact.email, href: `mailto:${contact.email}`}
            : null,
        contact.phone
            ? {label: contact.phone, href: `tel:${contact.phone}`}
            : null,
        contact.location ? {label: contact.location} : null,
        contact.linkedin
            ? {
                  label: contact.linkedin.replace(/^https?:\/\/(www\.)?/, ''),
                  href: contact.linkedin.startsWith('http')
                      ? contact.linkedin
                      : `https://${contact.linkedin}`,
              }
            : null,
        contact.portfolio
            ? {
                  label: contact.portfolio.replace(/^https?:\/\/(www\.)?/, ''),
                  href: contact.portfolio.startsWith('http')
                      ? contact.portfolio
                      : `https://${contact.portfolio}`,
              }
            : null,
    ].filter(Boolean) as {label: string; href?: string}[];

    return (
        <header className="text-center mb-8 pb-6 border-b border-gray-200">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-3">
                {contact.fullName}
            </h1>
            {items.length > 0 && (
                <div className="flex flex-wrap justify-center items-center gap-x-1 gap-y-1 text-sm text-gray-500">
                    {items.map((item, i) => (
                        <span key={i} className="flex items-center gap-1">
                            {i > 0 && (
                                <span className="text-gray-300 select-none">
                                    ·
                                </span>
                            )}
                            {item.href ? (
                                <ContactLink href={item.href}>
                                    {item.label}
                                </ContactLink>
                            ) : (
                                <span>{item.label}</span>
                            )}
                        </span>
                    ))}
                </div>
            )}
        </header>
    );
}
