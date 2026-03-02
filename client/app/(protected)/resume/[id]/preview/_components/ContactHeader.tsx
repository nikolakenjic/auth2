import {getContactInfo} from '@/app/lib/resume/resume.utils';

type ContactInfo = ReturnType<typeof getContactInfo>;

export function ContactHeader({contact}: {contact: ContactInfo}) {
    if (!contact.fullName) return null;

    const details = [
        contact.email,
        contact.phone,
        contact.location,
        contact.linkedin,
        contact.portfolio,
    ].filter(Boolean);

    return (
        <div className="text-center border-b pb-6 mb-6">
            <h1 className="text-3xl font-bold tracking-wide">
                {contact.fullName}
            </h1>
            <div className="flex flex-wrap justify-center gap-3 mt-2 text-sm text-gray-600">
                {details.map((detail, i) => (
                    <span key={i}>
                        {i > 0 ? '· ' : ''}
                        {detail}
                    </span>
                ))}
            </div>
        </div>
    );
}
