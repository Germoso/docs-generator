import pdfMake from "pdfmake/build/pdfmake"
import pdfFonts from "pdfmake/build/vfs_fonts"
pdfMake.vfs = pdfFonts.pdfMake.vfs

const makePDF = (blocks) => {
    const createBlockDefinition = (blocks) => {
        const content = blocks.map((block) => {
            const blockModel = {
                text: "",
                level: undefined,
                fontSize: undefined,
                margin: -2,
                lineHeight: 1.5,
                bold: false,
                lineHeight: 1.3,
            }
            switch (block.type) {
                case "header":
                    blockModel.text = `${block.data.text} \n`
                    blockModel.bold = true
                    switch (block.data.level) {
                        case 1:
                            blockModel.fontSize = 20
                            blockModel.text = `${block.data.text} \n\n`
                            break
                        case 2:
                            blockModel.fontSize = 16
                            break
                        case 3:
                            blockModel.fontSize = 14.72
                            break
                        case 4:
                            blockModel.fontSize = 16
                            break
                        case 5:
                            blockModel.fontSize = 13.28
                            break
                        case 6:
                            blockModel.fontSize = 10.72
                            break
                        default:
                            break
                    }

                    break

                case "paragraph":
                    blockModel.text = `${block.data.text} \n\n`
                    blockModel.level = block.data.level
                    blockModel.fontSize = block.fontSize
                    break

                default:
                    break
            }
            return blockModel
        })
        return {
            content,
            pageMargins: [75, 75, 75, 75],
        }
    }
    const docDefinition = createBlockDefinition(blocks)
    pdfMake.createPdf(docDefinition).open()
}

export { makePDF }
