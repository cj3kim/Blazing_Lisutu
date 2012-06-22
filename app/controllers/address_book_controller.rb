class AddressBookController < ApplicationController

  def index
    @address_book = AddressBook.all 
  end

  def edit
    @person = AddressBook.find(params[:id])

    respond_to do |format|
      format.html
      format.json{
        render :json => @person.to_json
      }
    end
  end

  def create
    @person = AddressBook.new(params[:post]) 

    if @person.save 
      redirect_to root_url, notice: 'Person has been added'
    else
      render 'new'
    end
  end

  def new
    @person = AddressBook.new
  end

  def show
    @person = AddressBook.find(params[:id])

    respond_to do |format|
      format.html
      format.json{
        render :json => @person.to_json
      }
    end
  end

  def update
    @book = AddressBook.find(params[:id])

    if @book.update_attributes(params[:post])
      redirect_to root_url, notice: 'Person has been edited'
    else
      render "edit"
    end    
  end

  def destroy

  end
end
