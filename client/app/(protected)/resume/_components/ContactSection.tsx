'use client';

import {ContactInfo} from '@/app/types/resume.types';
import {FormInput} from '@/components/form-fields/FormInput';

interface ContactSectionProps {
    contact: ContactInfo;
    onChange: (contact: ContactInfo) => void;
}

export function ContactSection({contact, onChange}: ContactSectionProps) {
    const update = (field: keyof ContactInfo, value: string) => {
        onChange({...contact, [field]: value});
    };

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput
                    name="contact-fullName"
                    label="Full Name"
                    value={contact.fullName ?? ''}
                    onChange={(e) => update('fullName', e.target.value)}
                    placeholder="e.g., John Doe"
                    isRequired
                />
                <FormInput
                    name="contact-email"
                    label="Email"
                    value={contact.email ?? ''}
                    onChange={(e) => update('email', e.target.value)}
                    placeholder="e.g., john@example.com"
                    isRequired
                />
                <FormInput
                    name="contact-phone"
                    label="Phone"
                    value={contact.phone ?? ''}
                    onChange={(e) => update('phone', e.target.value)}
                    placeholder="e.g., +1 (555) 000-0000"
                />
                <FormInput
                    name="contact-location"
                    label="Location"
                    value={contact.location ?? ''}
                    onChange={(e) => update('location', e.target.value)}
                    placeholder="e.g., New York, NY"
                />
                <FormInput
                    name="contact-linkedin"
                    label="LinkedIn"
                    value={contact.linkedin ?? ''}
                    onChange={(e) => update('linkedin', e.target.value)}
                    placeholder="e.g., linkedin.com/in/johndoe"
                />
                <FormInput
                    name="contact-portfolio"
                    label="Portfolio"
                    value={contact.portfolio ?? ''}
                    onChange={(e) => update('portfolio', e.target.value)}
                    placeholder="e.g., johndoe.dev"
                />
            </div>
        </div>
    );
}
