import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { DotsThreeVertical } from "@phosphor-icons/react";
import { type TableAction } from "~/client/components/TableActions/types";
import { cx } from "~/client/utils/cx";

interface Props {
  items: TableAction[];
}
export const TableActions = ({ items }: Props) => {
  return (
    <Menu
      as="div"
      className="relative inline-block flex items-center justify-end"
    >
      <Menu.Button className="rounded">
        <DotsThreeVertical size={20} />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right divide-y divide-base-100 rounded bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            {items.map(({ title, icon: Icon, onClick, variation }) => (
              <Menu.Item key={title}>
                {({ active }) => (
                  <button
                    onClick={onClick}
                    className={cx(
                      "prose-sm flex w-full items-center gap-2 rounded px-2 py-1",
                      {
                        primary: {
                          "bg-primary-400 text-white": active,
                          "text-primary-900": !active,
                        },
                        danger: {
                          "bg-danger-400 text-white": active,
                          "text-danger-900": !active,
                        },
                      }[variation || "primary"]
                    )}
                  >
                    <Icon size={16} />
                    {title}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
