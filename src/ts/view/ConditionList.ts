import GlobalDispather from '../control/GlobalDispather';
import { ConditionListEvent } from '../model/GlobalDispatchType';

/**
 * ソート条件のリスト
 */

export class ConditionList {
  list: HTMLElement;
  item: NodeList;
  cls: string;

  constructor(obj: any) {
    this.list = obj.list;
    this.item = this.list.querySelectorAll(obj.item);
    this.cls = 'current';
  }

  init() {
    GlobalDispather.add(this);

    this.item.forEach(item => {
      item.addEventListener('click', e => {
        const e2 = {
          type: ConditionListEvent.onClick,
          args: e,
        };
        GlobalDispather.dispatch(e2);
      });
    });
  }

  /**
   * 指定の条件をカレントにする
   * @param e
   */
  changeCurrent(e: Event) {
    // カレントクラスを外す
    this.item.forEach(item => {
      (item as HTMLElement).classList.remove(this.cls);
    });

    // カレントクラスを付与する
    (e.currentTarget as HTMLElement).classList.add(this.cls);
  }

  /**
   * イベント伝播
   * @param e
   */
  dispath(e: any) {
    switch (e.type) {
      case ConditionListEvent.onClick:
        this.changeCurrent(e.args);
    }
  }
}
