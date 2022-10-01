/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';

import Row from './Row';
import SelectedItem from './SelectedItem';

export default function index({
  name,
  placeholder = 'Hello World',
  options = [],
  value = [],
  required = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState(options || []);
  const [selectedItems, setSelectedItems] = useState(value || []);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!value || value.length === 0) {
      return;
    }
    setSelectedItems(value);
  }, [value]);

  const checkExistenceInArray = (array, itemObject) => {
    const itemExistInArray = array?.includes(itemObject);
    return itemExistInArray;
  };

  const selectItem = (item) => {
    const itemExistInSelectedOptions = checkExistenceInArray(
      selectedItems,
      item,
    );
    if (!itemExistInSelectedOptions) {
      setSelectedItems([...selectedItems, item]);
      setSearch('');
    }
  };

  const removeItem = (itemToDelete) => {
    const itemExistInSelectedOptions = checkExistenceInArray(
      selectedItems,
      itemToDelete,
    );
    const newArray = selectedItems.filter((item) => itemToDelete !== item);
    if (itemExistInSelectedOptions) {
      setSelectedItems([...newArray]);
    }
  };

  const searchItem = (searchLabel = '') => {
    const results = options?.filter((item) => {
      const itemLabel = item?.label.toLowerCase();
      const result = itemLabel.search(searchLabel.toLowerCase());
      return result >= 0;
    });
    setItems(results);
  };

  useEffect(() => {
    searchItem(search);
  }, [search]);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsOpen(false);
        }
      }
      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  const searchRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return (
    <div
      ref={wrapperRef}
      className="flex cursor-text items-center gap-4 relative transition-all duration-700 ease-in-out"
      onClick={() => {
        setIsOpen(true);
        setTimeout(() => searchRef.current.focus(), 5);
      }}
      role="button"
      tabIndex={selectedItems.length > 0 && !isOpen ? '0' : '-1'}
      onKeyPress={(e) => {
        if (e.key === 'Enter') {
          setIsOpen(true);
          setTimeout(() => searchRef.current.focus(), 5);
        }
      }}
    >
      <div
        className={classNames(
          'flex w-full gap-4 items-center border bg-white rounded-lg overflow-x-auto scrollbar-hidden',
          {
            'rounded-b-none': isOpen,
            'pr-20': !isOpen && selectedItems.length > 0,
          },
        )}
      >
        <div
          className={classNames('flex items-center gap-2 px-4 py-2.5', {
            hidden: isOpen || selectedItems.length === 0,
          })}
        >
          {selectedItems.map((item) => (
            <SelectedItem
              name={name}
              key={item.value}
              data={item}
              onClick={removeItem}
              inputMode
            />
          ))}
        </div>
        <input
          ref={searchRef}
          onFocus={() => setIsOpen(true)}
          className={classNames('w-full min-w-[100px] px-4 py-2.5 rounded-lg border-none focus:outline-none', {
            hidden: !isOpen && selectedItems.length > 0,
          })}
          placeholder={
            isOpen
              ? 'Buscar'
              : placeholder
          }
          required={required && selectedItems && selectedItems.length === 0}
          onInput={(e) => setSearch(e.target.value)}
          value={search}
        />

        <div
          className="absolute right-0 pr-4 flex items-center gap-2 bg-white rounded-l-full cursor-pointer"
        >
          <span className={classNames('bg-green-300 rounded-full text-xs min-w-min px-2.5 py-1', {
            'bg-red-500 text-white': required && selectedItems.length === 0,
          })}
          >
            {selectedItems?.length}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 pointer-events-none bg-white rounded-l-full"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      </div>

      {/* Select Collapsable Container */}
      <div
        className={classNames(
          'bg-white divide-y overflow-hidden rounded-b-lg absolute top-full left-0 w-full transition-opacity duration-300 ease-in-out',
          {
            'opacity-0 max-h-0': !isOpen,
            'opacity-100 border-x border-b': isOpen,
          },
        )}
      >
        {/* Selected Items */}
        {selectedItems && selectedItems.length > 0 && (
          <div className="p-4 flex flex-col gap-2 select-none cursor-default">
            <p className="text-xs">Seleccionados</p>
            <div className="flex items-center gap-2 flex-wrap">
              {selectedItems
                && selectedItems.map((item) => (
                  <SelectedItem
                    name={name}
                    key={item.value}
                    data={item}
                    onClick={removeItem}
                  />
                ))}
            </div>
          </div>
        )}

        <div
          className={classNames('overflow-y-auto h-full divide-y', {
            'max-h-0': !isOpen,
            'max-h-56': isOpen,
          })}
        >
          {/* Items Available to Select */}
          {items && items.map((option) => {
            const isSelected = checkExistenceInArray(selectedItems, option);
            if (isSelected) {
              return null;
            }
            return (
              <Row
                key={option.value}
                data={option}
                onClick={(item) => selectItem(item)}
              />
            );
          })}

          {/* Empty State */}
          {selectedItems && selectedItems.length >= items.length && (
            <Row
              data={{
                label: 'No hay más opciones disponibles',
              }}
              disabled
            />
          )}
        </div>
      </div>
    </div>
  );
}
