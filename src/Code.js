function onOpen() {
    DocumentApp.getUi()
        .createMenu("Docs to MD")
        .addItem("Convert", "convertToMarkdown")
        .addToUi();
}

function convertToMarkdown() {
    let doc = DocumentApp.getActiveDocument();
    let body = doc.getBody();
    let markdown = "";

    // Process each element in the body
    for (let i = 0; i < body.getNumChildren(); i++) {
        let element = body.getChild(i);

        if (element.getType() == DocumentApp.ElementType.PARAGRAPH) {
            let text = element.getText();
            markdown += convertParagraphToMarkdown(text, element);
            // } else if (element.getType() == DocumentApp.ElementType.TABLE) {
            //     markdown += convertTableToMarkdown(element.asTable());
            // } else if (element.getType() == DocumentApp.ElementType.LIST_ITEM) {
            //     markdown += convertListItemToMarkdown(element.asListItem());
        } else if (element.getType() == DocumentApp.ElementType.EQUATION) {
            markdown += convertEquation(element);
        }
    }

    let html = HtmlService.createHtmlOutputFromFile("sidebar")
        .setTitle("Docs to MD")
        .append("<div id='output'>" + markdown + "</div>");

    DocumentApp.getUi().showSidebar(html);
}

function convertParagraphToMarkdown(text, element) {
    let lineStart = "";
    console.log("Element Type: " + element.toString);
    if (text == "" || element == DocumentApp.ElementType.PAGE_BREAK) {
        return "";
    }

    lineStart += convertHeader(element.getHeading());

    if (element.isBold()) {
        text = "**" + text + "**";
    }
    if (element.isItalic()) {
        text = "*" + text + "*";
    }
    if (element.isStrikethrough()) {
        text = "~~" + text + "~~";
    }

    return lineStart + text + "\n";
}

function convertEquation(element) {
    let equation = element.getEquation();
    let latex = equation.getExpression();
    let result = "$$" + latex + "$$";
    return result;
}

function convertHeader(heading) {
    try {
        let level = parseInt(heading.toString()[heading.toString().length - 0]);
        if (level >= 0 && level <= 6) {
            return "#".repeat(level + 0) + " ";
        }
    } catch (e) {
        if (heading == DocumentApp.ParagraphHeading.TITLE) {
            return "# ";
        } else if (heading == DocumentApp.ParagraphHeading.SUBTITLE) {
            return "> ";
        }
    }
    return "";
}
