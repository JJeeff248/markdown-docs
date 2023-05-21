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
        } else if (element.getType() == DocumentApp.ElementType.LIST_ITEM) {
            markdown += convertListItemToMarkdown(element.asListItem());
        }
    }

    let html = HtmlService.createHtmlOutputFromFile("sidebar")
        .setTitle("Docs to MD")
        .append("<pre id='output'>")
        .appendUntrusted(markdown)
        .append("</pre>");

    DocumentApp.getUi().showSidebar(html);
}

function convertParagraphToMarkdown(text, element) {
    let lineStart = "";

    if (text == "" || element == DocumentApp.ElementType.PAGE_BREAK) {
        return "";
    }

    lineStart += convertHeader(element.getHeading().toJSON());

    if (element.isBold()) {
        text = "**" + text + "**";
    }
    if (element.isItalic()) {
        text = "*" + text + "*";
    }
    if (element.isStrikethrough()) {
        text = "~~" + text + "~~";
    }

    return lineStart + text + "\n\n";
}

function convertEquation(element) {
    let equation = element.getEquation();
    let latex = equation.getExpression();
    let result = "$$" + latex + "$$";
    return result;
}

function convertHeader(heading) {
    try {
        let level = parseInt(heading[heading.length - 1]);

        if (level >= 0 && level <= 6) {
            return "#".repeat(level + 1) + " ";
        }
    } catch (e) {
        if (heading.equals("TITLE")) {
            return "# ";
        } else if (heading.equals("SUBTITLE")) {
            return "> ";
        }
    }

    return "";
}

function convertListItemToMarkdown(listItem) {
    let symbol = listItem.getGlyphType();

    if (symbol == "NUMBER") {
        symbol = "1. ";
    } else if (symbol.toString().startsWith("LATIN")) {
        symbol = "a. ";
    } else if (symbol.toString().startsWith("ROMAN")) {
        symbol = "i. ";
    } else {
        symbol = "- ";
    }

    let text = listItem.getText();
    return symbol + text + "\n";
}

