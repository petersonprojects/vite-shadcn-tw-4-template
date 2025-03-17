// useInputValidation.ts

import { useState } from 'react';

// import {
// 	RegExpMatcher,
// 	englishDataset,
// 	englishRecommendedTransformers,
// } from 'obscenity';

// const matcher = new RegExpMatcher({
// 	...englishDataset.build(),
// 	...englishRecommendedTransformers,
// });

interface ValidationErrors {
  isEmpty?: boolean;
  isTooLong?: boolean;
  containsProfanity?: boolean;
}

function useInputValidation(initialValue: string) {
  const [value, setValue] = useState(initialValue);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validate = (newValue: string) => {
    const maxLength = 255;

    const newErrors: ValidationErrors = {};

    if (!newValue.trim()) {
      newErrors.isEmpty = true;
    }

    if (newValue.length > maxLength) {
      newErrors.isTooLong = true;
    }

    // Use obscenity library to check for profanity
    // if (matcher.hasMatch(newValue)) {
    //   newErrors.containsProfanity = true;
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    value,
    setValue: (newValue: string) => {
      setValue(newValue);
    },
    errors,
    validate
  };
}

export default useInputValidation;