'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, X, ChevronDown, ChevronUp, Trash2 } from 'lucide-react';

import { EducationItem } from '@/app/types/resume.types';
import { FormInput } from '@/components/form-fields/FormInput';
import { FormDateField } from '@/components/form-fields/FormDateField';

interface EducationSectionProps {
  items: EducationItem[];
  onChange: (items: EducationItem[]) => void;
}

const emptyEducation = (): EducationItem => ({
  school: '',
  degree: '',
  field: '',
  startDate: '',
  endDate: '',
  details: [],
});

export function EducationSection({ items, onChange }: EducationSectionProps) {
  const [expandedIndex, setExpandedIndex] = React.useState<number | null>(
    items.length === 0 ? null : 0,
  );

  const addItem = () => {
    const newItems = [...items, emptyEducation()];
    onChange(newItems);
    setExpandedIndex(newItems.length - 1);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
    setExpandedIndex(null);
  };

  const updateItem = (
    index: number,
    field: keyof EducationItem,
    value: any,
  ) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const addDetail = (index: number) => {
    const updated = [...items];
    updated[index] = {
      ...updated[index],
      details: [...updated[index].details, ''],
    };
    onChange(updated);
  };

  const removeDetail = (itemIndex: number, detailIndex: number) => {
    const updated = [...items];
    updated[itemIndex] = {
      ...updated[itemIndex],
      details: updated[itemIndex].details.filter((_, i) => i !== detailIndex),
    };
    onChange(updated);
  };

  const updateDetail = (
    itemIndex: number,
    detailIndex: number,
    value: string,
  ) => {
    const updated = [...items];
    const details = [...updated[itemIndex].details];
    details[detailIndex] = value;
    updated[itemIndex] = { ...updated[itemIndex], details };
    onChange(updated);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <label className="text-sm font-medium">Education</label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addItem}
          className="flex items-center gap-1"
        >
          <Plus className="h-4 w-4" />
          Add Education
        </Button>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-gray-500 py-4 text-center border border-dashed rounded">
          No education added yet.
        </p>
      ) : (
        <div className="space-y-3">
          {items.map((item, index) => {
            const isOpen = expandedIndex === index;
            const degreeField = [item.degree, item.field]
              .filter(Boolean)
              .join(' in ');
            const summary = degreeField
              ? `${degreeField} — ${item.school || 'School'}`
              : item.school || `Education ${index + 1}`;

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
                    <FormInput
                      name={`edu-school-${index}`}
                      label="School / University"
                      value={item.school}
                      onChange={(e) =>
                        updateItem(index, 'school', e.target.value)
                      }
                      placeholder="e.g., University of Michigan"
                      isRequired
                    />

                    <div className="grid grid-cols-2 gap-3">
                      <FormInput
                        name={`edu-degree-${index}`}
                        label="Degree"
                        value={item.degree || ''}
                        onChange={(e) =>
                          updateItem(index, 'degree', e.target.value)
                        }
                        placeholder="e.g., Bachelor of Science"
                      />
                      <FormInput
                        name={`edu-field-${index}`}
                        label="Field of Study"
                        value={item.field || ''}
                        onChange={(e) =>
                          updateItem(index, 'field', e.target.value)
                        }
                        placeholder="e.g., Computer Science"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <FormDateField
                        name={`edu-startDate-${index}`}
                        label="Start Date"
                        value={item.startDate || ''}
                        onChange={(e) =>
                          updateItem(index, 'startDate', e.target.value)
                        }
                      />
                      <FormDateField
                        name={`edu-endDate-${index}`}
                        label="End Date"
                        value={item.endDate || ''}
                        onChange={(e) =>
                          updateItem(index, 'endDate', e.target.value)
                        }
                      />
                    </div>

                    {/* Details */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-medium">
                          Details
                          <span className="text-xs text-gray-400 font-normal ml-1">
                            (honors, GPA, activities)
                          </span>
                        </label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addDetail(index)}
                          className="flex items-center gap-1"
                        >
                          <Plus className="h-3 w-3" />
                          Add Detail
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {item.details.length === 0 ? (
                          <p className="text-xs text-gray-400 text-center py-2 border border-dashed rounded">
                            Optional — add GPA, honors, or relevant coursework.
                          </p>
                        ) : (
                          item.details.map((detail, detailIndex) => (
                            <div
                              key={detailIndex}
                              className="flex gap-2 items-start"
                            >
                              <span className="text-gray-400 mt-2.5 shrink-0">
                                •
                              </span>
                              <FormInput
                                name={`edu-${index}-detail-${detailIndex}`}
                                label=""
                                value={detail}
                                onChange={(e) =>
                                  updateDetail(
                                    index,
                                    detailIndex,
                                    e.target.value,
                                  )
                                }
                                placeholder="e.g., Magna Cum Laude, GPA: 3.9"
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => removeDetail(index, detailIndex)}
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
