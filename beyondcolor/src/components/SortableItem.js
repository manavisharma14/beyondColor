import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function SortableItem({ id, color }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    backgroundColor: color,
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    border: "2px solid white",
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} />
  );
}
