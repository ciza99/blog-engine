import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
} from "@floating-ui/react";
import { useMemo } from "react";

export const usePopover = ({
  open,
  onOpenChange,
}: {
  open?: boolean;
  onOpenChange?: (value: boolean, event?: Event) => void;
}) => {
  const props = useFloating({
    open,
    onOpenChange,
    middleware: [offset(10), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(props.context);
  const dismiss = useDismiss(props.context);
  const role = useRole(props.context);

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [click, dismiss, role]
  );

  return useMemo(
    () => ({ ...props, getReferenceProps, getFloatingProps, getItemProps }),
    [props, getReferenceProps, getFloatingProps, getItemProps]
  );
};
