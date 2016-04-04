package com.logiclodge.springwebapp.base;

import java.util.Collection;

public interface BaseDao<E extends BaseResourceObject> {

	E get(String id);

	Collection<E> getAll();

	void save(E e);

	void delete(String id);
}
