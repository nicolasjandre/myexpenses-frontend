import { useCallback, useEffect } from "react";

const KEY_NAME_ESC = "Escape";
const KEY_EVENT_TYPE = "keyup";

export function useEscapeKey(handleCloseModal: () => void) {
    const handleEscKey = useCallback(
        (event: any) => {
            if (event.key === KEY_NAME_ESC) {
                handleCloseModal();
            }
        },
        [handleCloseModal]
    );

    useEffect(() => {
        document.addEventListener(KEY_EVENT_TYPE, handleEscKey, false);

        return () => {
            document.removeEventListener(KEY_EVENT_TYPE, handleEscKey, false);
        };
    }, [handleEscKey]);
}
