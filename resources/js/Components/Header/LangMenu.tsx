import { useDispatch, useSelector } from 'react-redux';
import { appLangSelector } from '@/Redux/Layout/selectors';
import Dropdown from '../../Components/Form/Dropdown';
import { changeLangAction } from '@/Redux/Layout';

export default function LangMenu() {
  const dispatch = useDispatch();
  const appLang = useSelector(appLangSelector);

  return (
    <div className="lang-block">
      <div className="icon-lang" />
      <div className="d-lang-block">
        <Dropdown>
          <Dropdown.Trigger>
            <span className="inline-block ml-[-5px]">
              <button
                type="button"
                className="inline-flex items-center
                        px-0 text-sm lng-menu
                        font-medium leading-4 text-black
                        transition duration-150
                        ease-in-out hover:text-gray-700 focus:outline-none"
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <b className="selected-lang">{appLang}</b>
                  <span className="icon-arrow-down arrow-lang" />
                </div>
              </button>
            </span>
          </Dropdown.Trigger>

          <Dropdown.Content>
            <span className="dropdown-span" onClick={() => dispatch(changeLangAction('uk'))}>
              Укр
            </span>
            <span className="dropdown-span" onClick={() => dispatch(changeLangAction('en'))}>
              En
            </span>
          </Dropdown.Content>
        </Dropdown>
      </div>
    </div>
  );
}
