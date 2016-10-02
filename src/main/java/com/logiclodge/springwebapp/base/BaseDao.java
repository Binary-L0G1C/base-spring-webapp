package com.logiclodge.springwebapp.base;

import java.util.Collection;

/**
 * Base interface for all DAOs
 * 
 * @author David
 *
 * @param <E>
 *            the {@link BaseResourceObject} that this DAO is tied to
 */
public interface BaseDao<E extends BaseResourceObject> {

	/**
	 * 
	 * 
	 * @param id
	 *            the id (usually uuid) of the object to get
	 * @return the object identified by the given id
	 */
	E get(String id);

	Collection<E> getAll();

	void save(E e);

	void delete(String id);
}
