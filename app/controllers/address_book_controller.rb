class AddressBookController < ApplicationController

  def index
    @address_book = AddressBook.all 
  end

  def new
    @person = AddressBook.new
  end

  def create
    @person = AddressBook.new(params[:post]) 

    if @person.save 
      redirect_to root_url, notice: 'Person has been added'
    else
      render 'new'
    end
  end

  def edit
    @person = AddressBook.find(params[:id])

  end

  def update
    
  end

  def destroy

  end
end
