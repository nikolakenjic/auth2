'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, X, ChevronDown, ChevronUp, Trash2 } from 'lucide-react';

import { ExperienceItem } from '@/app/types/resume.types';
import { FormInput } from '@/components/form-fields/FormInput';
import { FormDateField } from '@/components/form-fields/FormDateField';

interface ExperienceSectionProps {
  items: ExperienceItem[];
  onChange: (items: ExperienceItem[]) => void;
}

const emptyExperience = (): ExperienceItem => ({
  company: '',
  title: '',
  location: '',
  startDate: '',
  endDate: '',
  bullets: [''],
});

export function ExperienceSection({ items, onChange }: ExperienceSectionProps) {
  const [expandedIndex, setExpandedIndex] = React.useState<number | null>(
    items.length === 0 ? null : 0,
  );

  const addItem = () => {
    const newItems = [...items, emptyExperience()];
    onChange(newItems);
    setExpandedIndex(newItems.length - 1);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
    setExpandedIndex(null);
  };

  const updateItem = (
    index: number,
    field: keyof ExperienceItem,
    value: any,
  ) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const addBullet = (index: number) => {
    const updated = [...items];
    updated[index] = {
      ...updated[index],
      bullets: [...updated[index].bullets, ''],
    };
    onChange(updated);
  };

  const removeBullet = (itemIndex: number, bulletIndex: number) => {
    const updated = [...items];
    updated[itemIndex] = {
      ...updated[itemIndex],
      bullets: updated[itemIndex].bullets.filter((_, i) => i !== bulletIndex),
    };
    onChange(updated);
  };

  const updateBullet = (
    itemIndex: number,
    bulletIndex: number,
    value: string,
  ) => {
    const updated = [...items];
    const bullets = [...updated[itemIndex].bullets];
    bullets[bulletIndex] = value;
    updated[itemIndex] = { ...updated[itemIndex], bullets };
    onChange(updated);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <label className="text-sm font-medium">Experience</label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addItem}
          className="flex items-center gap-1"
        >
          <Plus className="h-4 w-4" />
          Add Experience
        </Button>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-gray-500 py-4 text-center border border-dashed rounded">
          No experience added yet.
        </p>
      ) : (
        <div className="space-y-3">
          {items.map((item, index) => {
            const isOpen = expandedIndex === index;
            const summary =
              [item.title, item.company].filter(Boolean).join(' at ') ||
              `Experience ${index + 1}`;

            return (
              <div key={index} className="border rounded-md overflow-hidden">
                {/* Header */}
                <div
                  className="flex items-center justify-between px-3 py-2 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => setExpandedIndex(isOpen ? null : index)}
                >
                  <span className="text-sm font-medium truncate">
                    {summary}
                  </span>
                  <div className="flex items-center gap-1 shrink-0">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeItem(index);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    {isOpen ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </div>
                </div>

                {/* Body */}
                {isOpen && (
                  <div className="p-4 space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <FormInput
                        name={`exp-title-${index}`}
                        label="Job Title"
                        value={item.title}
                        onChange={(e) =>
                          updateItem(index, 'title', e.target.value)
                        }
                        placeholder="e.g., Senior Developer"
                        isRequired
                      />
                      <FormInput
                        name={`exp-company-${index}`}
                        label="Company"
                        value={item.company}
                        onChange={(e) =>
                          updateItem(index, 'company', e.target.value)
                        }
                        placeholder="e.g., Acme Corp"
                        isRequired
                      />
                    </div>

                    <FormInput
                      name={`exp-location-${index}`}
                      label="Location"
                      value={item.location || ''}
                      onChange={(e) =>
                        updateItem(index, 'location', e.target.value)
                      }
                      placeholder="e.g., New York, NY (or Remote)"
                    />

                    <div className="grid grid-cols-2 gap-3">
                      <FormDateField
                        name={`exp-startDate-${index}`}
                        label="Start Date"
                        value={item.startDate}
                        onChange={(e) =>
                          updateItem(index, 'startDate', e.target.value)
                        }
                        isRequired
                      />
                      <FormDateField
                        name={`exp-endDate-${index}`}
                        label="End Date"
                        value={item.endDate || ''}
                        onChange={(e) =>
                          updateItem(index, 'endDate', e.target.value)
                        }
                      />
                    </div>

                    {/* Bullets */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-medium">
                          Bullet Points
                        </label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addBullet(index)}
                          className="flex items-center gap-1"
                        >
                          <Plus className="h-3 w-3" />
                          Add Bullet
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {item.bullets.length === 0 ? (
                          <p className="text-xs text-gray-400 text-center py-2 border border-dashed rounded">
                            No bullets yet. Add one to describe your impact.
                          </p>
                        ) : (
                          item.bullets.map((bullet, bulletIndex) => (
                            <div
                              key={bulletIndex}
                              className="flex gap-2 items-start"
                            >
                              <span className="text-gray-400 mt-2.5 shrink-0">
                                •
                              </span>
                              <FormInput
                                name={`exp-${index}-bullet-${bulletIndex}`}
                                label=""
                                value={bullet}
                                onChange={(e) =>
                                  updateBullet(
                                    index,
                                    bulletIndex,
                                    e.target.value,
                                  )
                                }
                                placeholder="e.g., Reduced load time by 40% by optimizing API calls"
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => removeBullet(index, bulletIndex)}
                                className="shrink-0 mt-0.5"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
