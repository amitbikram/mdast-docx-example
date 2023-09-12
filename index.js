const fs = require('fs');
const {mdast2docx} = require('milo-md2docx');
const parseMarkdown = require('milo-parse-markdown').default;

async function getMD() {
    console.log('Converting docx file to markdown');
    fs.readFile('sample.md', async (err, md) => {
        if (err) {
            console.error(err);
        }

        console.log('Converting MD to MDAST');
        const mdast = getMdastFromMd(md.toString());
        console.log('Converting MDAST to DOCX');
        const docx = await mdast2docx(mdast);
        console.log(docx.constructor);
        fs.writeFile('sample.docx', docx, err => {
            if (err) {
                console.error(err);
            }
        });
    });
}

function getMdastFromMd(mdContent) {
    const state = { content: { data: mdContent }, log: '' };
    parseMarkdown(state);
    return state.content.mdast;
}

(async function(){
    await getMD();
})();


