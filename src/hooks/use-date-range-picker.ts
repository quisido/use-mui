import type { Dispatch, SetStateAction } from 'react';
import { useCallback, useState } from 'react';
import DEFAULT_DATE_RANGE_PICKER_VALUE from '../constants/default-date-range-picker-value';
import DEFAULT_PROPS from '../constants/default-props';

interface Props {
  readonly defaultOpen?: boolean | undefined;
  readonly defaultValue?:
    | [
        Date | number | string | null | undefined,
        Date | number | string | null | undefined,
      ]
    | undefined;
  readonly onClose?: (() => void) | undefined;
  readonly onOpen?: (() => void) | undefined;
  readonly onChange?:
    | ((
        value: [
          Date | number | string | null | undefined,
          Date | number | string | null | undefined,
        ],
      ) => void)
    | undefined;
}

export interface State {
  readonly handleClose: () => void;
  readonly handleOpen: () => void;
  readonly open: boolean;
  readonly setOpen: Dispatch<SetStateAction<boolean>>;
  readonly handleChange: (
    value: [
      Date | number | string | null | undefined,
      Date | number | string | null | undefined,
    ],
  ) => void;
  readonly setValue: Dispatch<
    SetStateAction<
      [
        Date | number | string | null | undefined,
        Date | number | string | null | undefined,
      ]
    >
  >;
  readonly value: [
    Date | number | string | null | undefined,
    Date | number | string | null | undefined,
  ];
}

export default function useDateRangePicker({
  defaultOpen = false,
  defaultValue = DEFAULT_DATE_RANGE_PICKER_VALUE,
  onChange,
  onClose,
  onOpen,
}: Props = DEFAULT_PROPS): State {
  const [open, setOpen] = useState(defaultOpen);
  const [value, setValue] = useState(defaultValue);

  return {
    open,
    setOpen,
    setValue,
    value,

    handleChange: useCallback(
      (
        newValue: [
          Date | number | string | null | undefined,
          Date | number | string | null | undefined,
        ],
      ): void => {
        setValue(newValue);
        if (typeof onChange === 'function') {
          onChange(newValue);
        }
      },
      [onChange],
    ),

    handleClose: useCallback((): void => {
      setOpen(false);
      if (typeof onClose === 'function') {
        onClose();
      }
    }, [onClose]),

    handleOpen: useCallback((): void => {
      setOpen(true);
      if (typeof onOpen === 'function') {
        onOpen();
      }
    }, [onOpen]),
  };
}
