import type { Dispatch, SetStateAction, SyntheticEvent } from 'react';
import { useCallback, useState } from 'react';
import DEFAULT_PROPS from '../constants/default-props';
import DEFAULT_TREE_VIEW_EXPANDED from '../constants/default-tree-view-expanded';
import DEFAULT_TREE_VIEW_SELECTED from '../constants/default-tree-view-selected';

interface Props {
  readonly defaultExpanded?: readonly string[] | undefined;
  readonly defaultSelected?: string | readonly string[] | undefined;
  readonly onNodeSelect?:
    | ((event: SyntheticEvent, nodeIds: string | readonly string[]) => void)
    | undefined;
  readonly onNodeToggle?:
    | ((event: SyntheticEvent, nodeIds: readonly string[]) => void)
    | undefined;
}

export interface State {
  readonly expanded: readonly string[];
  readonly selected: string | readonly string[];
  readonly setExpanded: Dispatch<SetStateAction<readonly string[]>>;
  readonly setSelected: Dispatch<SetStateAction<string | readonly string[]>>;
  readonly handleNodeSelect: (
    event: SyntheticEvent,
    nodeIds: string | readonly string[],
  ) => void;
  readonly handleNodeToggle: (
    event: SyntheticEvent,
    nodeIds: readonly string[],
  ) => void;
}

export default function useTreeView({
  defaultExpanded = DEFAULT_TREE_VIEW_EXPANDED,
  defaultSelected = DEFAULT_TREE_VIEW_SELECTED,
  onNodeSelect,
  onNodeToggle,
}: Props = DEFAULT_PROPS): State {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [selected, setSelected] = useState(defaultSelected);

  return {
    expanded,
    selected,
    setExpanded,
    setSelected,

    handleNodeSelect: useCallback(
      (e: SyntheticEvent, nodeIds: string | readonly string[]): void => {
        setSelected(nodeIds);
        if (typeof onNodeSelect === 'function') {
          onNodeSelect(e, nodeIds);
        }
      },
      [onNodeSelect],
    ),

    handleNodeToggle: useCallback(
      (e: SyntheticEvent, nodeIds: readonly string[]): void => {
        setExpanded(nodeIds);
        if (typeof onNodeToggle === 'function') {
          onNodeToggle(e, nodeIds);
        }
      },
      [onNodeToggle],
    ),
  };
}
