import { useCallback } from "react"

type Font = {
  fontFamily: string,
  source: ArrayBuffer | string
}

const useLoadFonts = (fonts: Font | Font[]) => {
  return useCallback(
    async () => {
      window.requestIdleCallback(() => {
        const fontsArray = Array.isArray(fonts) ? fonts : [fonts]
        return Promise.all(fontsArray.map(item => {
          const font = new FontFace(item.fontFamily, item.source)
          document.fonts.add(font)
          return font.load()
        }))
      })
    }, [fonts])
}
export default useLoadFonts
