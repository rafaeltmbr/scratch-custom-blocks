window.addEventListener("load", () => {
  const codeContainer = document.querySelector(".code-container");

  function addCustomConsoleBlockToBlockly() {
    Blockly.Blocks["output_console"] = {
      init: function () {
        this.appendValueInput("value")
          .setCheck(null)
          .appendField("console")
          .appendField(
            new Blockly.FieldDropdown([
              ["log", "log"],
              ["warn", "warn"],
              ["error", "error"],
            ]),
            "stream"
          );
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(165);
        this.setTooltip("Sends the input value to the browser's console");
        this.setHelpUrl("");
      },
    };
  }
  addCustomConsoleBlockToBlockly();

  // create Blockly workspace
  const workspace = Blockly.inject("blocklyDiv", {
    comments: true,
    disable: false,
    collapse: false,
    media: "./media/",
    readOnly: false,
    rtl: false,
    scrollbars: true,
    toolbox: document.getElementById("toolbox"),
    toolboxPosition: "start",
    horizontalLayout: false,
    sounds: true,
    zoom: {
      controls: true,
      wheel: true,
      startScale: 0.675,
      maxScale: 4,
      minScale: 0.25,
      scaleSpeed: 1.1,
    },
    colours: {
      fieldShadow: "rgba(255, 255, 255, 0.3)",
      dragShadowOpacity: 0.6,
    },
  });

  function showXmlStructure() {
    const xml = Blockly.Xml.workspaceToDom(workspace);
    codeContainer.innerText = Blockly.Xml.domToPrettyText(xml);
  }

  // insert the start code into Blockly workspace area (optional)
  Blockly.Xml.domToWorkspace(document.getElementById("startBlocks"), workspace);

  // keep track of every workspace change and update the XML representation
  workspace.addChangeListener(showXmlStructure);
  showXmlStructure();
});
