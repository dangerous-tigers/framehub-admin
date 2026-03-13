import Link from "next/link";

import { Popover } from "@dangerous-tigers/framehub-ui-kit/components";
import Block from "@dangerous-tigers/framehub-ui-kit/icons/Block";
import Block1 from "@dangerous-tigers/framehub-ui-kit/icons/Block1";
import MoreHorizontal from "@dangerous-tigers/framehub-ui-kit/icons/MoreHorizontal";
import PersonRemoveOutline from "@dangerous-tigers/framehub-ui-kit/icons/PersonRemoveOutline";

import s from "./Popover.module.scss";

type Props = {
  isBanned?: boolean;
  userId?: number;
};

export const PopoverComponent = ({ isBanned, userId }: Props) => {
  const onClickDelete = () => {
    //console.log("delete user with id: ", userId);
  };

  const onClickBan = () => {
    //console.log("ban user with id: ", userId);
  };

  const onClickUnBan = () => {
    //console.log("un-ban user with id: ", userId);
  };

  return (
    <div className={s.root}>
      <Popover isOwner={false} isAuthorized={false}>
        <ul className={s.list}>
          <li onClick={onClickDelete}>
            <PersonRemoveOutline />
            <span>Delete User</span>
          </li>
          {!isBanned && (
            <li onClick={onClickBan}>
              <Block />
              <span>Ban in the system</span>
            </li>
          )}
          {isBanned && (
            <li onClick={onClickUnBan}>
              <Block1 />
              <span>Un-ban User</span>
            </li>
          )}
          <li>
            <Link href={`/users/${userId}`}>
              <MoreHorizontal />
              <span>More Information</span>
            </Link>
          </li>
        </ul>
      </Popover>
    </div>
  );
};
