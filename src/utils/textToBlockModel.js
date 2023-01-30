const extractModelsFromText = async (textToConvert) => {
    const extractTextFromHTML = (node, tagsToExtract) => {
        const tags = tagsToExtract.map((tagToExtract) => tagToExtract.tag)
        console.log(tags)
        let text = ""
        if (node.nodeType === Node.TEXT_NODE) {
            text = node.textContent
        } else if (node.nodeType === Node.ELEMENT_NODE && tags.includes(node.tagName)) {
            const [tagToExtract] = tagsToExtract.filter((tag) => tag.tag === node.tagName)
            text = node.textContent
            node.remove()
            return {
                type: tagToExtract.type,
                data: {
                    text,
                    level: tagToExtract.level,
                },
            }
        }
    }

    function getBlocks(node, tagsToExtract) {
        const array = []
        for (let i = 0; i < node.childNodes.length; i++) {
            const text = extractTextFromHTML(node.childNodes[i], tagsToExtract)
            array.push(text)
        }
        return array
    }

    let tagsToExtract = [
        {
            type: "header",
            tag: "H1",
            level: 1,
        },
        {
            type: "header",
            tag: "H2",
            level: 2,
        },
        {
            type: "header",
            tag: "H3",
            level: 3,
        },
        {
            type: "header",
            tag: "H4",
            level: 4,
        },
        {
            type: "header",
            tag: "H5",
            level: 5,
        },
        {
            type: "paragraph",
            tag: "H6",
            level: 6,
        },
        {
            type: "paragraph",
            tag: "P",
        },
    ]

    return new Promise((resolve, reject) => {
        if (textToConvert) {
            let parser = new DOMParser()
            let doc = parser.parseFromString(textToConvert, "text/html")
            resolve(getBlocks(doc.body, tagsToExtract))
        }
    })
}

export { extractModelsFromText }
