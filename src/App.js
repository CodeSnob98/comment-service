import { useRef, useState } from "react";
import "./App.css";
import Comment from "./components/Comment";

function App() {
  const [data, setData] = useState([]);
  const [showableData, setShowableData] = useState([]);
  const ref = useRef("");

  function addComment() {
    data.push({
      id: Date.now(),
      comment: ref.current.value,
      reply: [],
      level: 0,
      disabled: false,
    });
    setData(data);
    settingShowableData(data);
    ref.current.value = "";
  }

  function replyComment(id, com) {
    function findNReply(id, com, data) {
      data.forEach((el) => {
        if (el.id === id) {
          el.reply.push({
            id: Date.now(),
            comment: com,
            reply: [],
            disabled: false,
          });
          return;
        } else if (el.reply.length > 0) {
          return findNReply(id, com, el.reply);
        }
      });
    }
    findNReply(id, com, data);
    setData(JSON.parse(JSON.stringify(data)));
    settingShowableData(JSON.parse(JSON.stringify(data)));
  }

  function deleteComment(id) {
    function findNDelete(id, data) {
      data.forEach((el) => {
        if (el.id === id) {
          el.disabled = true;
          return;
        } else if (el.reply.length > 0) {
          return findNDelete(id, el.reply);
        }
      });
    }
    findNDelete(id, data);
    setData(JSON.parse(JSON.stringify(data)));
    settingShowableData(JSON.parse(JSON.stringify(data)));
  }

  function editComment(id, com) {
    function findNEdit(id, com, data) {
      data.forEach((el) => {
        if (el.id === id) {
          el.comment = com;
          return;
        } else if (el.reply.length > 0) {
          return findNEdit(id, com, el.reply);
        }
      });
    }
    findNEdit(id, com, data);
    setData(JSON.parse(JSON.stringify(data)));
    settingShowableData(JSON.parse(JSON.stringify(data)));
  }

  function settingShowableData(data) {
    let myData = flattenData(data, 0);
    setShowableData(myData);
  }

  function flattenData(data, i) {
    let myData = [];
    data.forEach((el) => {
      if (!el.disabled) {
        el.level = i;
        myData.push(el);
        if (el.reply.length > 0) {
          myData.push(...flattenData(el.reply, i + 1));
        }
      }
    });
    return myData;
  }

  return (
    <div className="App">
      <div className="display-row">
        <input ref={ref} type="text"></input>
        <button className="add-reply-com" onClick={addComment}>
          Add comment
        </button>
      </div>
      <div className="display-col">
        {showableData.map((e) => {
          if (!e.disabled) {
            return (
              <div
                style={{
                  marginLeft: `${20 * e.level}px`,
                  borderLeft: "1px solid green",
                }}
                key={e.id}
              >
                <Comment
                  data={e}
                  reply={replyComment}
                  edit={editComment}
                  delete={deleteComment}
                />
              </div>
            );
          }
          return <></>;
        })}
      </div>
    </div>
  );
}

export default App;
