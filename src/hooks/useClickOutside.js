import { useEffect } from "react";

// Purpose of this hook is to enable closing of the dropdown ctr while clicking outside the frame. additions have been made to prevent double triggering the button on mobile.
const useClickOutside = (ref, callback, triggerRef = null) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        (!triggerRef ||
          !triggerRef.current ||
          !triggerRef.current.contains(event.target)) // Prevent re-trigger from button
      ) {
        callback();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [ref, callback, triggerRef]);
};

export default useClickOutside;
