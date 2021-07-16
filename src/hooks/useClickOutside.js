import { useEffect, useCallback } from 'react'

const isRefArray = r => 'length' in r

const isTarget = (ref, event) => ref && ref.current && ref.current.contains(event.target)

const trueForAny = (array, condition) =>
  array.reduce((conditionAlreadyMet, ref) => conditionAlreadyMet || condition(ref), false)

const useClickOutside = (ref, onclick) => {
  const handleClick = useCallback(
    event => {
      if (!isRefArray(ref)) {
        if (isTarget(ref, event)) return
      } else if (trueForAny(ref, r => isTarget(r, event))) return
      onclick()
    },
    [onclick, ref]
  )

  useEffect(() => {
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [handleClick])

  return ref
}

export default useClickOutside
