import { motion, Reorder, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Tab } from "../Tab";
import { TabContent } from "~/types/tab.type";
import { removeItem, closestItem } from "../../utils/array-utils";
import { AddIcon } from "~/icons/AddIcon";
import "../../styles.css";

export default function DockGroup() {
  const [tabs, setTabs] = useState<Array<TabContent>>([]);
  const [selectedTab, setSelectedTab] = useState<TabContent>(tabs[0]);

  const remove = (item: TabContent) => {
    if (item === selectedTab) {
      setSelectedTab(closestItem(tabs, item));
    }

    setTabs(removeItem(tabs, item));
  };

  const add = () => {
    const nextTab: TabContent = {
      label: "New Tab",
      icon: "@",
      content: <div>Content</div>,
    };

    if (nextTab) {
      setTabs([...tabs, nextTab]);
      setSelectedTab(nextTab);
    }
  };

  return (
    <div
      id={"window"}
      className={"window size-full bg-white overflow-hidden flex flex-col"}
    >
      <nav>
        <Reorder.Group
          as={"ul"}
          axis={"x"}
          onReorder={setTabs}
          id={"tabs"}
          values={tabs}
          className={"tabs"}
        >
          <AnimatePresence>
            {tabs.map((item: TabContent) => (
              <Tab
                key={item.label}
                item={item}
                isSelected={selectedTab === item}
                onClick={() => setSelectedTab(item)}
                onRemove={() => remove(item)}
              />
            ))}
          </AnimatePresence>
        </Reorder.Group>
        <motion.button
          className="add-item flex justify-center items-center"
          whileTap={{ scale: 0.9 }}
          onClick={add}
        >
          <AddIcon />
        </motion.button>
      </nav>
      <main>
        <AnimatePresence mode={"wait"}>
          <motion.div
            key={selectedTab?.label}
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.15 }}
          >
            {selectedTab?.content}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
