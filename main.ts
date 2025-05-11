/**
 * microbit makecode Package: Scroll Text.
 * Author: shao ziyang, 2018.Sept
 * From microbit/micropython Chinese community.
 * http://www.micropython.org.cn
 */




enum NICE_TEXT_FONT {
    //% block="MINECRAFT ALPHA"
    MINECRAFT_ALPHA = "MINECRAFT_ALPHA",
 }


//% weight=20 color=#Ffbc11 icon="T" block="NiceText"
namespace NiceText {

    // Minecraft Alpha created by SinMedia Studios: https://fontstruct.com/fontstructions/show/2482281/minecraft-alpha
    const MINECRAFT_ALPHA = `
      Aa  Bb  Cc  Dd  Ee  Ff  Gg  Hh  Ii Jj  Kk  Ll  Mm    Nn    Oo  Pp  Qq   Rr  Ss  Tt  Uu  Vv  Ww    Xx  Yy  Zz  Åå  Ää  Öö  0   1  2   3   4   5   6   7   8   9   . ! ?   +   -   *   /   : =
      ### ### ### ##. ### ### ### #.# #  ..# #.# #.. #...# #...# ### ### ###. ### ### ### #.# #.# #...# #.# #.# ### .#. #.# #.# ### .# ### ### #.# ### ### ### ### ### . # ### ... ... ... ..# . ...
      #.# #.# #.. #.# #.. #.. #.. #.# #  ..# #.# #.. ##.## ##..# #.# #.# #.#. #.# #.. .#. #.# #.# #...# #.# #.# ..# ... ... ... #.# ## ..# ..# #.# #.. #.. ..# #.# #.# . # ..# .#. ... #.# ..# . ###
      ### ##. #.. #.# ##. ##. #.# ### #  ..# ##. #.. #.#.# #.#.# #.# ### #.#. ##. ### .#. #.# #.# #.#.# .#. ### .#. ### ### ### #.# .# ### .## ### ### ### .#. .#. ### . # .#. ### ### .#. .#. # ...
      #.# #.# #.. #.# #.. #.. #.# #.# #  #.# #.# #.. #...# #..## #.# #.. #.#. #.# ..# .#. #.# #.# #.#.# #.# .#. #.. ### ### #.# #.# .# #.. ..# ..# ..# #.# #.. #.# ..# . . ... .#. ... #.# #.. . ###
      #.# ### ### ##. ### #.. ### #.# #  ### #.# ### #...# #...# ### #.. #### #.# ### .#. ### .#. .#.#. #.# .#. ### #.# #.# ### ### .# ### ### ..# ### ### #.. ### ### # # .#. ... ... ... #.. # ...
    `

    /**
     * show a scroll string
     * @param s      , eg: "Hello"
     * @param delay  , eg: 100
     */
    //% blockId="NICE_TEXT_SHOWSTRING"
    //% block="scroll string %s|delay %delay|letter spacing %letterSpacing|word spacing %wordSpacing"
    //% s.defl="Hello world!" delay.defl=200 letterSpacing.defl=1 wordSpacing.defl=3
    //% weight=100 blockGap=8
    export function showString(message: string, delay: number, letterSpacing: number, wordSpacing: number): void {
        if (message == '') return

        const fontRows = MINECRAFT_ALPHA
            .split('\n')
            .filter(row => row.trim().length > 0)
            .map(row => row
                .split(' ')
                .filter(letter => letter.trim().length > 0)
            )
        
        const imgRows = [
            '.....',
            '.....',
            '.....',
            '.....',
            '.....'
        ]

        message.split('').forEach(char => {
            if (char === ' ') {
                addSpacing(imgRows, wordSpacing - letterSpacing)
                return
            }

            const match = fontRows[0].find(letter => letter.includes(char))
            if (!match) {
                return
            }

            const index = fontRows[0].indexOf(match)
            for (let y = 0; y < 5; y++) {
                imgRows[y] += fontRows[y + 1][index]
            }
            addSpacing(imgRows, letterSpacing)
        })

        for (let offset = 0; offset <= imgRows[0].length; offset++) {
            const img = showImage(imgRows, offset, delay);
        }
    }

    /**
      * show a scroll number
      * @param n      , eg: 123
      * @param delay  , eg: 100
      */
    //% blockId="NICE_TEXT_SHOWNUMBER" block="scroll number %n|delay %delay|letter spacing %letterSpacing|word spacing %wordSpacing"
    //% n.defl=123 delay.defl=200 letterSpacing.defl=1 wordSpacing.defl=3
    //% weight=100 blockGap=8
    export function showNumber(n: number, delay: number, letterSpacing: number, wordSpacing: number): void {
        showString(n.toString(), delay, letterSpacing, wordSpacing)
    }

    function showImage(imgRows: string[], offset: number, delay: number) {
        let img = images.createImage(`
            .....
            .....
            .....
            .....
            .....
        `)

        for (let x = offset; x < offset + 5; x++) {
            for(let y = 0; y < 5; y++) {
                img.setPixel(x - offset, y, imgRows[y].charAt(x) === '#')
            }
        }
        img.showImage(0, delay);
        return img
    }

    function addSpacing(imgRows: string[], spacing: number) {
        for (let y = 0; y < 5; y++) {
            for (let x = 0; x < spacing; x++) {
                imgRows[y] += '.'
            }
        }
    }
}