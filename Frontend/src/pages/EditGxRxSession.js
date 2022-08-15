import React from 'react';
import { Dialog } from 'primereact/dialog';



const EditGxRxSession = ({ modelGxSession, show, setShow, title }) => {
  
  const hideDialog = () => {
      setShow(false);

  }


  return (
       <div>
         <Dialog visible={show} style={{ textAlign: 'left', width: '800px', height: '400px' }}     header={title} modal={true}  onHide={hideDialog} >
              <div className="p-col-8 margin">
                  <div>

                        <pre
                          dangerouslySetInnerHTML={{
                            __html: syntaxHighlight(JSON.stringify(modelGxSession, undefined, 4))
                          }}
                        />
                    </div>
            </div>                           
           </Dialog>
       </div>
  );
};


export function syntaxHighlight(json) {
  if (!json) return ""; //no JSON from response

  json = json
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    function (match) {
      var cls = "number";
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = "key";
        } else {
          cls = "string";
        }
      } else if (/true|false/.test(match)) {
        cls = "boolean";
      } else if (/null/.test(match)) {
        cls = "null";
      }
      return '<span class="' + cls + '">' + match + "</span>";
    }
  );
}
/*
pre {
  outline: 1px solid #ccc;
  padding: 5px;
  margin: 15px;
}
.string {
  color: green;
}
.number {
  color: darkorange;
}
.boolean {
  color: blue;
}
.null {
  color: magenta;
}
.key {
  color: red;
}
*/

export default EditGxRxSession;
