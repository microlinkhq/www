---
title: 'mediaRef'
---

Type: <TypeContainer><Type children='<object>'/> | <Type children='<function>'/></TypeContainer>

It returns the DOM reference used for mounting the internal media component.

Depending on your implementation and requirements, the way you'd use this property can vary.

**with useRef**

If you don't need the ref "on mount" (eg. for attaching callbacks), React's [useRef](https://reactjs.org/docs/hooks-reference.html#useref) hook alone will suffice:

```jsx
const MyComponent = () => {
  const mediaRef = useRef()

  return (
    <div>
      <Microlink
        /* passing your props */
        mediaRef={mediaRef}
      />

      <button onClick={() => mediaRef.current.play()}>Play</button>
      <button onClick={() => mediaRef.current.pause()}>Pause</button>
    </div>
  )
}
```

<br/>

**with useCallback & useRef**

If you need access to the media DOM element on mount, you would want to use the [useCallback](https://reactjs.org/docs/hooks-reference.html#usecallback) hook. This solution is explained briefly in the [React FAQ's](https://reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node), and in a bit more detail in [this](https://medium.com/@teh_builder/ref-objects-inside-useeffect-hooks-eb7c15198780) popular Medium post:

```jsx
const MyComponent = () => {
  const mediaRef = useRef()
  const getMediaRef = useCallback(node => {
    const onPlay = () => alert('video playing!')

    // Listener cleanup, like the return function on `useEffect`
    if (mediaRef.current) {
      mediaRef.current.removeEventListener('play', onPlay)
    }

    // Create event listeners
    if (node) {
      mediaRef.current.addEventListener('play', onPlay)
    }

    // Update `mediaRef` to latest DOM node
    mediaRef.current = node
  }, [])

  return (
    <Microlink
      /* passing your props */
      mediaRef={getMediaRef}
    />
  )
}
```
