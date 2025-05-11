/**
 * microbit makecode Package: Scroll Text.
 * Author: shao ziyang, 2018.Sept
 * From microbit/micropython Chinese community.
 * http://www.micropython.org.cn
 */




enum NICE_TEXT_DIR {
    //% block="LEFT"
    LEFT,
    //% block="UP"
    UP,
    //% block="RIGHT"
    RIGHT,
    //% block="DOWN"
    DOWN
}

enum NICE_TEXT_ROTATE {
    //% block="0"
    SR_0,
    //% block="90"
    SR_90,
    //% block="180"
    SR_180,
    //% block="270"
    SR_270
}




//% weight=20 color=#Ffbc11 icon="T" block="NiceText"
namespace NiceText {

    // Minecraft Alpha created by SinMedia Studios: https://fontstruct.com/fontstructions/show/2482281/minecraft-alpha
    const MINECRAFT_ALPHA = `
      Aa  Bb  Cc  Dd. Ee  Ff  Gg  Hh. Ii Jj  Kk
      ### ### ### ##. ### ### ### #.# #  ..# #.#
      #.# #.# #.. #.# #.. #.. #.. #.# #  ..# #.#
      ### ##. #.. #.# ##. ##. #.# ### #  ..# ##.
      #.# #.# #.. #.# #.. #.. #.# #.# #  #.# #.#
      #.# ### ### ##. ### #.. ### #.# #  ### #.#
    `

    /**
     * show a scroll string
     * @param s      , eg: "Hello"
     * @param dir    , eg: NICE_TEXT_DIR.LEFT
     * @param rotate , eg: NICE_TEXT_ROTATE.SR_0
     * @param delay  , eg: 100
     */
    //% blockId="NICE_TEXT_SHOWSTRING" block="scroll string %s|dir %dir|rotate %rotate|delay %delay"
    //% weight=100 blockGap=8
    export function showString(s: string, delay: number, letterSpacing: number, wordSpacing: number): void {
        let L = s.length + 1

        if (s == '') return

        s = ' ' + s + ' '
        let img: Image = null

        const fontRows = MINECRAFT_ALPHA.split('\n');
        const imageRows = fontRows.join('\n').replace(' ', '.')
        img = images.createImage('..#..') // TODO: must create image another way, dynamic strings not supported!
        img.scrollImage(1,200);
    }

    /**
      * show a scroll number
      * @param n      , eg: 123
      * @param delay  , eg: 100
      */
    //% blockId="NICE_TEXT_SHOWNUMBER" block="scroll number %n|delay %delay"
    //% weight=100 blockGap=8
    export function showNumber(n: number, delay: number, letterSpacing: number, wordSpacing: number): void {
        showString(n.toString(), delay, letterSpacing, wordSpacing)
    }
}



NiceText.showString('HELLO', 100, 1, 5);
