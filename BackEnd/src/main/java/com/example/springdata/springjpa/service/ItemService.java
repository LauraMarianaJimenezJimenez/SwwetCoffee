package com.example.springdata.springjpa.service;

import com.example.springdata.springjpa.model.Item;

public interface ItemService {
	
	Iterable<Item> getAllItems();

	void deleteAllItems();

	Iterable<Item> getItemsByVenta(long id);

	void AddItem(Item newItem);

	Iterable<Item> getItemsByProducto(long id);

}
