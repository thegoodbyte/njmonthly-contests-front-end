<template>
  <div>

    <div class="toolbar">
      <div class="insert-link-section">
        
        <div :class="'dre-toolbar-popup-wrapper '" id="linkSection">
          <span  class="unselectable dre-btn" unselectable="on" v-on:click="toggleLinkInserter">Insert Link</span>&nbsp;
          <span :class="'cursor-toolbar unselectable dre-btn ' + cursorToolbar" unselectable="on" v-on:click="removeAnchor">Unlink</span>
          <div :class="'dre-toolbar-popup ' + showing">
            <div id="linkInserter">
              <div>
                <input type="text" name="anchorHref" id="anchorHref" placeholder="http://">
              </div>
              <div>
                <label for="anchorTarget">Open in new tab</label>&nbsp;
                <input type="checkbox" checked="true" id="anchorTarget" name="anchorTarget">
              </div>
              <div>
                <input type="button" v-on:click="insertText" value="Insert">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div @input="update" :id="drid" contenteditable="true" class="dreditor">Some <a href="#">other editable</a> text</div>

    

    <!-- <input type="button"  unselectable="on" value="Insert Link" v-on:click="toggleLinkInserter" /> -->
    

  </div>
</template>

<script>

export default {
  name: 'dreditor',
  props: ['content', 'drid'],
  mounted() {
    document.getElementById(this.drid).innerHTML = this.content;

    let linkSection = document.getElementById("linkSection");
    
    linkSection.addEventListener("click", function(e){
      e.stopPropagation();// this will stop propagation of this event to upper level
    });

    let that = this;
    document.body.addEventListener("click", 
      function(e) {
        that.showing = false;
        console.log("You clicked outside linkInserter. Close.");
      }
    );


    document.addEventListener("click", function(e){
      let editor = document.getElementById(that.drid);

      const clickedInEditor = editor.contains(e.target);
      
      console.log('clicked', clickedInEditor);
      if (clickedInEditor) {
        // Check to see if the clicked item is in an achor tag
        let sel = window.getSelection();
        let anchorNode = sel.anchorNode.parentNode;
        if (anchorNode.nodeName === 'A') {
          that.cursorToolbar = true;
        } else {
          that.cursorToolbar = false;
        }
        
      } 

    });

  },
  data () {
    return {
      showing: false,
      selRange: '',
      cursorToolbar: false
    }
  },
  methods: {
    update:function(event){
      this.$emit('update',event.target.innerHTML);
    },
    removeAnchor(e) {

        // First, make sure that the selected element
        // is inside the editor
        let sel = window.getSelection();

        let editor = document.getElementById(this.drid);

        // This is the text node
        let anchorTextNode = sel.anchorNode;

        const clickedInEditor = editor.contains(anchorTextNode);

        if (!clickedInEditor) {
          return;
        }

        // This is the text of the text node
        let anchorText = sel.anchorNode.nodeValue;
        // This is the anchor tag node with the text in it
        let anchorNode = sel.anchorNode.parentNode;

        // Replace the anchor node with its text
        sel.anchorNode.parentElement.outerHTML = anchorText;

        this.cursorToolbar = false;

        this.$emit('update',document.getElementById(this.drid).innerHTML);
        
    },
    isDescendant: function(parent, child) {
        var node = child.parentNode;
        while (node != null) {
            if (node == parent) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    },
    saveSelection: function() {
        var sel;
        if (window.getSelection) {
            sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                return sel.getRangeAt(0);
            }
        } else if (document.selection && document.selection.createRange) {
            return document.selection.createRange();
        }
        return null;
    },

    restoreSelection: function(range) {
        var sel;
        if (range) {
            if (window.getSelection) {
                sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
            } else if (document.selection && range.select) {
                range.select();
            }
        }
    },

    // When the user clicks the button to insert a link,
    // save the selected text
    toggleLinkInserter: function() {
        this.showing = !this.showing;
        this.selRange = this.saveSelection();
        // document.getElementById("linkInserter").style.display = "block";
        document.getElementById("anchorHref").focus();
    },
    

    insertText: function() {
      var sel, range, html;

        var anchorHref = document.getElementById("anchorHref").value;
        document.getElementById("anchorHref").value = '';
        // document.getElementById("linkInserter").style.display = "none";
        this.showing = false;
        this.restoreSelection(this.selRange);
        document.getElementById("test").focus();

        if (window.getSelection) {

            // An object of the user's selection
            sel = window.getSelection();

            if (sel.getRangeAt && sel.rangeCount) {

                var target = document.getElementById("anchorTarget").checked;

                var anchor = document.createElement('a');
                
                // The text that the user selected
                let anchorText = new XMLSerializer().serializeToString(sel.getRangeAt(0).cloneContents());

                anchor.innerHTML = anchorText;
                anchor.href = anchorHref;
                if (target) {
                  anchor.target = "_blank";
                }
                
                range = sel.getRangeAt(0);

                range.deleteContents();

                range.insertNode(anchor);
                sel.removeAllRanges();
                range = range.cloneRange();
                range.selectNode(anchor);
                range.collapse(false);
                sel.addRange(range);

                this.$emit('update',document.getElementById(this.drid).innerHTML);

            }
        } else if (document.selection && document.selection.createRange) {
            range = document.selection.createRange();
            range.pasteHTML(text);
            range.select();
        }
    },


    createLink: function(e) {
      var selection = this.getSelectedText();
      console.log('selection', selection);
      var selection_text = selection.toString();
      
      var anchor = document.createElement('a');
      anchor.innerHTML = selection_text;
      anchor.href = "/hello";
      
      var range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(anchor);
    },

    getSelectedText: function() {
      var t = (document.all) ? document.selection.createRange().text : document.getSelection();
      return t;
    },
    createLink2: function(e) {
      var t = this,
          documentSelection = t.doc.getSelection(),
          node = documentSelection.focusNode,
          text = new XMLSerializer().serializeToString(documentSelection.getRangeAt(0).cloneContents()),
          url,
          title,
          target;

      while (['A', 'DIV'].indexOf(node.nodeName) < 0) {
          node = node.parentNode;
      }

      if (node && node.nodeName === 'A') {
          var $a = $(node);
          text = $a.text();
          url = $a.attr('href');
          if (!t.o.minimalLinks) {
              title = $a.attr('title');
              target = $a.attr('target');
          }
          var range = t.doc.createRange();
          range.selectNode(node);
          documentSelection.removeAllRanges();
          documentSelection.addRange(range);
      }

      t.saveRange();

      var options = {
          url: {
              label: 'URL',
              required: true,
              value: url
          },
          text: {
              label: t.lang.text,
              value: text
          }
      };
      if (!t.o.minimalLinks) {
          Object.assign(options, {
              title: {
                  label: t.lang.title,
                  value: title
              },
              target: {
                  label: t.lang.target,
                  value: target
              }
          });
      }

      t.openModalInsert(t.lang.createLink, options, function (v) { // v is value
          var url = t.prependUrlPrefix(v.url);
          if (!url.length) {
              return false;
          }

          var link = $(['<a href="', url, '">', v.text || v.url, '</a>'].join(''));

          if (!t.o.minimalLinks) {
              if (v.title.length > 0) {
                  link.attr('title', v.title);
              }
              if (v.target.length > 0) {
                  link.attr('target', v.target);
              }
          }
          t.range.deleteContents();
          t.range.insertNode(link[0]);
          t.syncCode();
          t.$c.trigger('tbwchange');
          return true;
      });
    },
  },
  computed: {
    currentDirectory() {

    }
  },
  components: {
  },
}
</script>

<style lang="scss">
.dir-card__facets {

    font-weight: 600;
    font-size: 15px;
    line-height: 14px;
    line-height: 16px;
    margin-bottom: 5px !important;

}
// #linkInserter {
//     display: none;
// }
.dre-toolbar-popup.false {
  display: none;
}
.unselectable {
    -moz-user-select:none;
    -webkit-user-select:none;
}

.dre-btn {
    font-size: 12px;
    border: 1px solid #c1c1c1;
    padding: 2px 6px;
}

.dre-btn:hover {
  cursor: pointer;
}

.dre-toolbar-popup {
  position: absolute;
  z-index: 7;
  padding-top: 0;
  left: 0;
  font-size: 14px;
  line-height: 14px !important;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,.2);
  border: 1px solid rgba(0,0,0,.2);
}
.cursor-toolbar {
  display: none;
}
.cursor-toolbar.true {
    display: inline-block;
}

#linkInserter {
    padding: 10px;
}

.dreditor {
    background: white;
    padding: 5px 10px;
    border: 2px solid #e9e9e9;
    border-radius: 3px;
    min-height: 37px;
}
</style>
